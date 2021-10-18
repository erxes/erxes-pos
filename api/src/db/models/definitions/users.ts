import { Document, Schema } from "mongoose";
import { field, schemaCreatedAt } from "./utils";

export interface IUser {
  createdAt?: Date;
  username?: string;
  password: string;
  isOwner?: boolean;
  email?: string;
  isActive?: boolean;
}

export interface IUserDocument extends IUser, Document {
  _id: string;
}

// User schema
export const userSchema = new Schema({
  _id: field({ pkey: true }),
  createdAt: schemaCreatedAt,
  username: field({ type: String, label: "Username" }),
  password: field({ type: String }),
  isOwner: field({ type: Boolean, label: "Is owner" }),
  email: field({
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
      "Please fill a valid email address",
    ],
    label: "Email",
  }),
  isActive: field({ type: Boolean, default: true, label: "Is active" })
});
