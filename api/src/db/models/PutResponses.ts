import { model } from 'mongoose';
import { putResponseSchema, IPutResponseDocument } from './definitions/putResponses';
import { PutData } from './PutData';
import { IEbarimtConfig } from '../models/definitions/configs';

interface IPutResponseDoc {
  date: Date,
  orderId: string,
  hasVat: boolean,
  hasCitytax: boolean,
  billType: string,
  customerCode: string,
  customerName: string,
  productsById: any,
  details: any[],
  cashAmount: number,
  nonCashAmount: number,

  transaction,
  records,
  taxType: string,
  returnBillId: string,

  contentType: string,
  contentId: string,
}

class PutResponse {
  public static async putData(doc: IPutResponseDoc, config: IEbarimtConfig) {
    const putData = new PutData({ ...doc, config });
    return putData.run();
  }

  // public static async returnBill(models, deal, config) {
  //   return returnBill(models, deal, config)
  // }

  public static async putHistories({ contentType, contentId }) {
    const putResponse = await PutResponses.findOne({
      contentType, contentId, success: true
    }).sort({ createdAt: -1 });

    if (!putResponse) { return; }
    if (!putResponse.billId) { return; }

    return putResponse
  }

  public static async createPutResponse(doc) {
    const response = await PutResponses.create({
      ...doc,
      createdAt: new Date(),
    });

    return response;
  }

  public static async updatePutResponse(_id, doc) {
    const response = await PutResponses.updateOne({ _id }, {
      $set: {
        ...doc,
        modifiedAt: new Date(),
      }
    });

    return response;
  }
}

putResponseSchema.loadClass(PutResponse);

export const PutResponses = model<IPutResponseDocument>('put_responses', putResponseSchema);
