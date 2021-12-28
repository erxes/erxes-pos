import * as express from 'express';
import { IConfigDocument } from '../db/models/definitions/configs';
import { IUserDocument } from '../db/models/definitions/users';

export interface IContext {
  res: express.Response;
  requestInfo: any;
  user: IUserDocument;
  config: IConfigDocument;
}

export interface IOrderItemInput {
  _id: string;
  productId: string;
  count: number;
  unitPrice: number;
  isPackage?: boolean;
}

export interface IOrderInput {
  items: [IOrderItemInput];
  totalAmount: number;
  type: string;
  customerId?: string;
}
