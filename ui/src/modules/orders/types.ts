import { IUser } from 'modules/auth/types';
import { QueryResponse, ICustomField } from 'types';
import { ISlot } from '../../types';

export interface IOrderItem {
  _id: string;
  createdAt?: Date;
  productId: string;
  count: number;
  unitPrice: number;
  discountAmount?: number;
  discountPercent?: number;
  bonusCount?: number;
  orderId: string;
  productName: string;
  isPackage?: boolean;
  isTake?: boolean;
  status?: string;
}

export interface IQPayInvoice {
  _id: string;
  senderInvoiceNo: string;
  amount: string;
  qpayInvoiceId: string;
  qrText: string;
  qpayPaymentId: string;
  paymentDate: Date;
  createdAt: Date;
  status: string;
}

export interface IPaymentInput {
  _id: string;
  cashAmount?: number;
  cardAmount?: number;
  cardInfo?: any;
}

export interface IOrder {
  _id: string;
  status: string;
  createdAt: Date;
  modifiedAt: Date;
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
  type: string;
  deliveryInfo?: any;
  cardPayments?: any[];
  origin?: string;
  items: IOrderItem[];
  customer?: ICustomer;
  user: IUser;
  putResponses?: IPutResponse[];
  qpayInvoices: IQPayInvoice[];
  slotCode?: string
}

interface IProductCommonFields {
  _id: string;
  name: string;
  code: string;
  description?: string;
  attachment?: IAttachment;
}

export interface IProduct extends IProductCommonFields {
  categoryId?: string;
  type?: string;
  unitPrice?: number;
  status?: string;
  count?: number;

  sku?: string;
  customFieldsData?: ICustomField[];
  tagIds?: string[];
  vendorId?: string;
  vendorCode?: string;
  mergedIds?: string[];
}

export interface IProductCategory extends IProductCommonFields {
  order: string;
  parentId?: string;
}

export interface IOrderItemInput {
  _id: string;
  count: number;
  productId: string;
  productName: string;
  unitPrice?: number;
  productImgUrl?: string;
  isPackage?: boolean;
  isTake?: boolean;
  slotCode?: string;
  status?: string;
  discountPercent?: number;
  discountAmount?: number;
  bonusCount?: number;
}

export type OrdersAddMutationResponse = ({ variables }: any) => Promise<any>;

export type OrdersEditMutationResponse = ({ variables }: any) => Promise<any>;

export type OrderChangeStatusMutationResponse = ({
  variables
}: any) => Promise<any>;

export type OrderItemChangeStatusMutationResponse = ({
  variables: any
}) => Promise<any>;

export type OrderDetailQueryResponse = {
  orderDetail: IOrder;
  subscribeToMore: any;
} & QueryResponse;

export type SlotsQueryResponse = {
  poscSlots: ISlot[];
} & QueryResponse;

export type OrderQueryResponse = {
  orders: IOrder[];
} & QueryResponse;

export type FullOrderQueryResponse = {
  fullOrders: IOrder[];
  subscribeToMore: any;
} & QueryResponse;

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

  // TODO migrate after remove 1row
  companyIds?: string[];

  mergedIds?: string[];
  status?: string;
  code?: string;
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

export interface IAttachment {
  url: string;
  name: string;
  type: string;
  size: number;
}

export interface IPutResponse {
  createdAt: Date;
  contentType: string;
  contentId: string;
  success: string;
  billId: string;
  date: string;
  macAddress: string;
  internalCode: string;
  billType: string;
  lotteryWarningMsg: string;
  errorCode: string;
  message: string;
  getInformation: string;
  taxType: string;
  qrData: string;
  lottery: string;
  sendInfo: object;
  stocks: object;
  amount: string;
  vat: string;
  cityTax: string;
  returnBillId: string;
  cashAmount: string;
  nonCashAmount: string;
  registerNumber: string;
  customerName: string;
}

export interface ICustomerParams {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  sex?: number;
}

export interface IInvoiceParams {
  orderId: string;
  amount?: number;
}

export interface IInvoiceCheckParams {
  orderId: string;
  _id: string;
}

export interface IPaymentParams {
  cardAmount?: number;
  cashAmount?: number;
  mobileAmount?: number;
  billType: string;
  registerNumber?: string;
}
