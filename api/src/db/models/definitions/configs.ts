import { Document, Schema } from 'mongoose';
import { field, schemaCreatedAt } from './utils';

interface IEbarimtConfig {
  companyName: string;
  ebarimtUrl: string;
  checkCompanyUrl: string;
  hasVat: boolean;
  hasCitytax: boolean;
  districtCode: number;
  companyRD: string;
  defaultGSCode: string;
  vatPercent: number;
  cityTaxPercent: number;
}

export interface IConfig {
  name: string;
  description?: string;
  brandId: string;
  tagIds?: string[];
  productDetails: string[];
  adminIds: string[];
  cashierIds: string[];
  kitchenScreen: any;
  waitingScreen: any;
  kioskMachine: any;
  formSectionTitle: string;
  formIntegrationIds: string[];
  token?: string;
  uiOptions: any;
  ebarimtConfig: IEbarimtConfig;
}

export interface IConfigDocument extends Document, IConfig {
  _id: string;
}

export interface IProductGroup {}

export interface IProductGroupDocument extends Document, IProductGroup {
  _id: string;
}

const ebarimtConfigSchema = new Schema(
  {
    companyName: field({ type: String, label: 'Company name' }),
    ebarimtUrl: field({ type: String, label: 'Ebarimt server url' }),
    checkCompanyUrl: field({ type: String, label: 'Company info url' }),
    hasVat: field({ type: Boolean }),
    hasCitytax: field({ type: Boolean }),
    districtCode: field({ type: String, label: 'Province or district code' }),
    companyRD: field({ type: String, label: 'Company register number' }),
    defaultGSCode: field({ type: String, label: 'Default inventory code' }),
    vatPercent: field({ type: String, label: 'Vat percent' }),
    cityTaxPercent: field({ type: String, label: 'UB city tax percent' }),
  },
  { _id: false }
);

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
  uiOptions: { type: Object, label: 'Logo & color configs' },
  ebarimtConfig: ebarimtConfigSchema,
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
