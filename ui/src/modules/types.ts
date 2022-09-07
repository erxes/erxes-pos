import type { FC, ReactNode } from 'react';

export type IProps = {
  children?: ReactNode;
};

export type IProductBase = {
  _id: string;
  name: string;
  unitPrice: number;
  isPackage?: boolean;
};

export type ICartItem = IProductBase & {
  productId: string;
  count: number;
  isTake: boolean;
  isSelected: boolean;
  status: string;
  productImgUrl: string;
};

export type IProduct = IProductBase & {
  categoryId?: string | null;
  type?: string | null;
  description?: string | null;
  attachment?: { url?: string } | null;
};

export type IComponent = FC<IProps>;
