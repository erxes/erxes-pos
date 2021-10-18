import { Document, Schema } from "mongoose";
import { attachmentSchema, ICustomField, customFieldSchema } from "./common";
import { ICompany } from "./companies";
import { PRODUCT_STATUSES, PRODUCT_TYPES } from "./constants";
import { field, schemaCreatedAt } from "./utils";

export interface IProduct {
  name: string;
  categoryId?: string;
  categoryCode?: string;
  type?: string;
  description?: string;
  sku?: string;
  unitPrice?: number;
  code: string;
  customFieldsData?: ICustomField[];
  productId?: string;
  tagIds?: string[];
  attachment?: any;
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

export interface IProductCategory {
  name: string;
  code: string;
  order: string;
  description?: string;
  parentId?: string;
}

export interface IProductCategoryDocument extends IProductCategory, Document {
  _id: string;
  createdAt: Date;
}

export const productSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: "Name" }),
  code: field({ type: String, unique: true, label: "Code" }),
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
  description: field({ type: String, optional: true, label: "Description" }),
  sku: field({ type: String, optional: true, label: "Stock keeping unit" }),
  unitPrice: field({ type: Number, optional: true, label: "Unit price" }),
  customFieldsData: field({
    type: [customFieldSchema],
    optional: true,
    label: "Custom fields data",
  }),
  createdAt: schemaCreatedAt,
  attachment: field({ type: attachmentSchema }),
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
});

export const productCategorySchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: "Name" }),
  code: field({ type: String, unique: true, label: "Code" }),
  order: field({ type: String, label: "Order" }),
  parentId: field({ type: String, optional: true, label: "Parent" }),
  description: field({ type: String, optional: true, label: "Description" }),
  createdAt: schemaCreatedAt,
});
