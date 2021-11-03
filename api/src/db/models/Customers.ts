import { Model, model } from 'mongoose';
import {
  customerSchema,
  ICustomer,
  ICustomerDocument
} from './definitions/customers';
import { IUserDocument } from './definitions/users';

interface IGetCustomerParams {
  email?: string;
  phone?: string;
  code?: string;
  integrationId?: string;
  cachedCustomerId?: string;
}

interface ICustomerFieldsInput {
  primaryEmail?: string;
  primaryPhone?: string;
  code?: string;
}

export interface IVisitorContactInfoParams {
  customerId: string;
  visitorId?: string;
  type: string;
  value: string;
}

export interface IBrowserInfo {
  language?: string;
  url?: string;
  city?: string;
  countryCode?: string;
}

export interface ICustomerModel extends Model<ICustomerDocument> {
  checkDuplication(
    customerFields: ICustomerFieldsInput,
    idsToExclude?: string[] | string
  ): never;
  findActiveCustomers(selector, fields?): Promise<ICustomerDocument[]>;
  getCustomer(_id: string): Promise<ICustomerDocument>;
  getCustomerName(customer: ICustomer): string;
  createCustomer(
    doc: ICustomer,
    user?: IUserDocument
  ): Promise<ICustomerDocument>;
  getWidgetCustomer(doc: IGetCustomerParams): Promise<ICustomerDocument | null>;
}

export const loadClass = () => {
  class Customer {
    public static async checkDuplication(
      customerFields: ICustomerFieldsInput,
      idsToExclude?: string[] | string
    ) {
      const query: { status: {}; [key: string]: any } = {
        status: { $ne: 'deleted' }
      };
      let previousEntry;

      // Adding exclude operator to the query
      if (idsToExclude) {
        query._id =
          idsToExclude instanceof Array
            ? { $nin: idsToExclude }
            : { $ne: idsToExclude };
      }

      if (customerFields.primaryEmail) {
        // check duplication from primaryEmail
        previousEntry = await Customers.find({
          ...query,
          primaryEmail: customerFields.primaryEmail
        });

        if (previousEntry.length > 0) {
          throw new Error('Duplicated email');
        }
      }

      if (customerFields.primaryPhone) {
        // check duplication from primaryPhone
        previousEntry = await Customers.find({
          ...query,
          primaryPhone: customerFields.primaryPhone
        });

        if (previousEntry.length > 0) {
          throw new Error('Duplicated phone');
        }
      }

      if (customerFields.code) {
        // check duplication from code
        previousEntry = await Customers.find({
          ...query,
          code: customerFields.code
        });

        if (previousEntry.length > 0) {
          throw new Error('Duplicated code');
        }
      }
    }

    public static getCustomerName(customer: ICustomer) {
      if (customer.firstName || customer.lastName) {
        return (customer.firstName || '') + ' ' + (customer.lastName || '');
      }

      if (customer.primaryEmail || customer.primaryPhone) {
        return customer.primaryEmail || customer.primaryPhone;
      }

      const { visitorContactInfo } = customer;

      if (visitorContactInfo) {
        return visitorContactInfo.phone || visitorContactInfo.email;
      }

      return 'Unknown';
    }

    public static async findActiveCustomers(selector, fields) {
      return Customers.find(
        { ...selector, status: { $ne: 'deleted' } },
        fields
      );
    }

    public static async getCustomer(_id: string) {
      const customer = await Customers.findOne({ _id });

      if (!customer) {
        throw new Error('Customer not found');
      }

      return customer;
    }

    public static async createCustomer(
      doc: ICustomer | ICustomerDocument
    ): Promise<ICustomerDocument> {
      // Checking duplicated fields of customer
      try {
        await Customers.checkDuplication(doc);
      } catch (e) {
        throw new Error(e.message);
      }

      if (doc.primaryEmail && !doc.emails) {
        doc.emails = [doc.primaryEmail];
      }

      if (doc.primaryPhone && !doc.phones) {
        doc.phones = [doc.primaryPhone];
      }

      if (doc.integrationId) {
        doc.relatedIntegrationIds = [doc.integrationId];
      }

      const customer = await Customers.create({
        createdAt: new Date(),
        modifiedAt: new Date(),
        ...doc,
      });

      return Customers.getCustomer(customer._id);
    }

    /*
     * Get widget customer
     */
    public static async getWidgetCustomer({
      integrationId,
      email,
      phone,
      code,
      cachedCustomerId
    }: IGetCustomerParams) {
      let customer: ICustomerDocument | null = null;

      if (email) {
        customer = await Customers.findOne({
          $or: [{ emails: { $in: [email] } }, { primaryEmail: email }]
        });
      }

      if (!customer && phone) {
        customer = await Customers.findOne({
          $or: [{ phones: { $in: [phone] } }, { primaryPhone: phone }]
        });
      }

      if (!customer && code) {
        customer = await Customers.findOne({ code });
      }

      if (!customer && cachedCustomerId) {
        customer = await Customers.findOne({ _id: cachedCustomerId });
      }

      if (customer) {
        const ids = customer.relatedIntegrationIds;

        if (integrationId && ids && !ids.includes(integrationId)) {
          ids.push(integrationId);
          await Customers.updateOne(
            { _id: customer._id },
            { $set: { relatedIntegrationIds: ids } }
          );
          customer = await Customers.findOne({ _id: customer._id });
        }
      }

      return customer;
    }
  }

  customerSchema.loadClass(Customer);

  return customerSchema;
};

loadClass();

// tslint:disable-next-line
const Customers = model<ICustomerDocument, ICustomerModel>(
  'customers',
  customerSchema
);

export default Customers;
