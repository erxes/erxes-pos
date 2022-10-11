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
