import React from 'react';
import { IProduct, IOrderItemInput } from '../types';
import { Item } from '../styles';
import { formatNumber } from 'modules/utils';

type Props = {
  product: IProduct;
  orientation: string;
  addItem: (item: IOrderItemInput) => void;
  activeProductId: string;
  isActive: boolean;
};

export default function ProductItem(props: Props) {
  const { product, addItem, orientation, isActive } = props;
  const { attachment, name, unitPrice } = product;
  const attachmentUrl = attachment && attachment.url ? attachment.url : '';

  const onClick = () => {
    addItem({
      productId: product._id,
      count: 1,
      productName: product.name,
      _id: Math.random().toString(),
      unitPrice: product.unitPrice,
      productImgUrl: attachmentUrl
    });
  };

  return (
    <Item
      onClick={onClick}
      isPortrait={orientation === 'portrait'}
      isActive={isActive}
    >
      <div className="image-wrapper">
        <img
          src={attachmentUrl ? attachmentUrl : 'images/no-category.jpg'}
          alt={name}
        />
      </div>
      <div className={orientation === 'portrait' ? 'text-kiosk' : 'text-wrapper'}>
        <h4>{name}</h4>
        <span>{formatNumber(unitPrice || 0)}₮</span>
      </div>
    </Item>
  );
}
