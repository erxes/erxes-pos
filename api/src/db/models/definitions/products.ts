import { Document, Schema } from "mongoose";
import { attachmentSchema, ICustomField, customFieldSchema } from "./common";
import { ICompany } from "./companies";
import { PRODUCT_STATUSES, PRODUCT_TYPES } from "./constants";
import { field, getDateFieldDefinition } from "./utils";

interface IAttachment {
  url: string;
  name: string;
  type: string;
  size: number;
};

interface IProductCommonFields {
  name: string;
  code: string;
  description?: string;
  attachment?: IAttachment;
}

export interface IProduct extends IProductCommonFields {
  categoryId?: string;
  type?: string;
  sku?: string;
  unitPrice?: number;
  customFieldsData?: ICustomField[];
  tagIds?: string[];
  status?: string;
  vendorId?: string;
  vendorCode?: string;
  mergedIds?: string[];
}

export interface IProductDocument extends IProduct, Document {
  _id: string;
  createdAt: Date;
  vendor?: ICompany;
}

export interface IProductCategory extends IProductCommonFields {
  order: string;
  parentId?: string;
}

export interface IProductCategoryDocument extends IProductCategory, Document {
  _id: string;
  createdAt: Date;
}

const productCommonSchema = {
  name: field({ type: String, label: "Name" }),
  code: field({ type: String, unique: true, label: "Code" }),
  description: field({ type: String, optional: true, label: "Description" }),
  attachment: field({ type: attachmentSchema }),
  createdAt: getDateFieldDefinition('Created at'),
};

export const productSchema = new Schema({
  _id: field({ pkey: true }),
  categoryId: field({ type: String, label: "Category" }),
  type: field({
    type: String,
    enum: PRODUCT_TYPES.ALL,
    default: PRODUCT_TYPES.PRODUCT,
    label: "Type",
  }),
  tagIds: field({
    type: [String],
    optional: true,
    label: "Tags",
    index: true,
  }),
  sku: field({ type: String, optional: true, label: "Stock keeping unit" }),
  unitPrice: field({ type: Number, optional: true, label: "Unit price" }),
  customFieldsData: field({
    type: [customFieldSchema],
    optional: true,
    label: "Custom fields data",
  }),
  status: field({
    type: String,
    enum: PRODUCT_STATUSES.ALL,
    optional: true,
    label: "Status",
    default: "active",
    esType: "keyword",
    index: true,
  }),
  vendorId: field({ type: String, optional: true, label: "Vendor" }),
  mergedIds: field({ type: [String], optional: true }),
  ...productCommonSchema
});

export const productCategorySchema = new Schema({
  _id: field({ pkey: true }),
  order: field({ type: String, label: "Order" }),
  parentId: field({ type: String, optional: true, label: "Parent" }),
  ...productCommonSchema
});
