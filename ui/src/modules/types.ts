import type { FC, ReactNode } from 'react';

export type IProps = {
  children?: ReactNode;
};

export type IProductBase = {
  _id: string;
  name: string;
  unitPrice: number;
  isCheckRem: boolean;
  isPackage?: boolean;
  remainder?: number;
};

export type ICartItem = IProductBase & {
  productId: string;
  count: number;
  isTake: boolean;
  status: string;
  productImgUrl: string;
  discountAmount?: number;
  discountPercent?: number;
  bonusCount?: number;
  manufacturedDate?: string;
};

export type IProduct = IProductBase & {
  categoryId?: string | null;
  type?: string | null;
  description?: string | null;
  attachment?: { url?: string } | null;
};

export type IComponent = FC<IProps>;

export interface IEbarimtConfig {
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
  footerText: string;
}

export interface PaymentType {
  _id: string;
  type: string;
  title: string;
  icon: string;
  config?: {
    port?: string;
    skipEbarimt?: boolean;
    mustCustomer?: boolean;
    notSplit?: boolean;
    preTax?: boolean;
  };
}

export interface ConfigsState {
  currentUser: any;
  currentConfig: any;
  configs: any;
  allowReceivable: boolean;
  allowInnerBill: boolean;
  logoUrl: string | null;
  receiptIcon: string | null;
  bgImage: string | null;
  primaryColor: string | '';
  paymentTypes: PaymentType[] | null;
  kioskHeaderImage: string | '';
  showWaiting?: boolean;
}

export type IRadio = 'checked' | 'error' | 'loading' | '' | false;
