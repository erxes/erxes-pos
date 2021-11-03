import { Document, Schema } from 'mongoose';
import { field, schemaCreatedAt } from './utils';

export interface IConfig {
  name: string;
  description?: string;
  brandId: string;
  tagIds?: string[];
  productDetails: string[];
  adminIds: string[];
  cashierIds: string[];
  kitchenScreen: any;
  waitinScreen: any;
  kioskMachine: any;
  formSectionTitle: string;
  formIntegrationIds: string[];
  token?: string;
  uiOptions: any;
}

export interface IConfigDocument extends Document, IConfig {
  _id: string;
}

export interface IProductGroup {}

export interface IProductGroupDocument extends Document, IProductGroup {
  _id: string;
}

export const configSchema = new Schema({
  _id: field({ pkey: true }),
  name: { type: String, label: 'name' },
  description: { type: String, label: 'description' },
  userId: { type: String, optional: true, label: 'created by' },
  createdAt: schemaCreatedAt,
  integrationId: { type: String, label: 'Erxes integration' },
  productDetails: { type: [String] },
  adminIds: { type: [String] },
  cashierIds: { type: [String] },
  waitingScreen: { type: Object },
  kioskMachine: { type: Object },
  kitchenScreen: { type: Object },
  formSectionTitle: { type: String },
  formIntegrationIds: { type: [String] },
  brandId: { type: String },
  token: { type: String, label: 'Token generated at erxes-api' },
  uiOptions: { type: Object, label: 'Logo & color configs' }
});

export const productGroupSchema = new Schema({
  _id: field({ pkey: true }),
  name: { type: String },
  description: { type: String },
  posId: { type: String },
  categoryIds: { type: [String], optional: true },
  excludedCategoryIds: { type: [String], optional: true },
  excludedProductIds: { type: [String], optional: true },
});
