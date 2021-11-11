import { IUser } from "modules/auth/types";
import { QueryResponse } from "types";

export interface IOrderItem {
  _id: string;
  createdAt?: Date;
  productId: string;
  count: number;
  unitPrice: number;
  discountAmount?: number;
  discountPercent?: number;
  orderId: string;
}

export interface IOrder {
  _id: string;
  status: string;
  createdAt: Date;
  paidDate: Date;
  number: string;
  customerId?: string;
  cardAmount: number;
  cashAmount: number;
  mobileAmount: number;
  totalAmount: number;
  finalAmount: number;
  shouldPrintEbarimt: boolean;
  printedEbarimt: boolean;
  billType: string;
  billId: string;
  registerNumber: string;
  oldBillId: string;

  items: IOrderItem[];
  customer?: ICustomer;
  user: IUser
};

export interface IProduct {
  _id: string;
  name: string;
  categoryId?: string;
  type?: string;
  description?: string;
  unitPrice?: number;
  code: string;
  attachment?: any;
  status?: string;
}

export interface IProductCategory {
  _id: string;
  name: string;
  code: string;
  order: string;
  description?: string;
  parentId?: string;
}

export interface IOrderItemInput {
  _id: string;
  count: number;
  productId: string;
  productName: string;
  unitPrice?: number;
}

export type OrdersAddMutationResponse = ({
  variables: any
}) => Promise<any>;

export type OrderDetailQueryResponse = {
  orderDetail: IOrder;
} & QueryResponse

export interface ICustomer {
  state?: 'visitor' | 'lead' | 'customer';

  scopeBrandIds?: string[];
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: Date;
  sex?: number;
  primaryEmail?: string;
  emails?: string[];
  avatar?: string;
  primaryPhone?: string;
  phones?: string[];

  ownerId?: string;
  position?: string;
  department?: string;
  leadStatus?: string;
  hasAuthority?: string;
  description?: string;
  doNotDisturb?: string;
  isSubscribed?: string;
  emailValidationStatus?: string;
  phoneValidationStatus?: string;
  links?: any;
  relatedIntegrationIds?: string[];
  integrationId?: string;
  tagIds?: string[];

  // TODO migrate after remove 1row
  companyIds?: string[];

  mergedIds?: string[];
  status?: string;
  customFieldsData?: any;
  trackedData?: any;
  location?: any;
  visitorContactInfo?: any;
  deviceTokens?: string[];
  code?: string;
  isOnline?: boolean;
  lastSeenAt?: Date;
  sessionCount?: number;
  visitorId?: string;

  _id: string;
  profileScore?: number;
  score?: number;
  createdAt: Date;
  modifiedAt: Date;
  searchText?: string;
}
