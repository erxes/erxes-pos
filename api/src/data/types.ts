import * as express from 'express';
import { IUserDocument } from '../db/models/definitions/users';

export interface IContext {
  res: express.Response;
  requestInfo: any;
  user: IUserDocument;
}

export interface IOrderItemInput {
  productId: String;
  count: number;
}

export interface IOrderInput {
  items: [IOrderItemInput];
  totalAmount: number;
  type: string;
  customerId?: string;
}
