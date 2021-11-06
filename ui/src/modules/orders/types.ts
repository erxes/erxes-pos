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
}) => void;
