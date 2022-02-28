import React from 'react';

import { AppContext } from 'appContext';
import { ProductCategory } from '../styles';
// import { FlexCenter } from 'modules/common/styles/main';
import { IProductCategory } from '../types';
// import { LeftCategory } from './kiosk/style';

type Props = {
  category: IProductCategory;
  activeCategoryId: string;
  orientation: string;
  onClickCategory: (activeCategoryId: string) => void;
};

export default function CategoryItem(props: Props) {
  const { currentConfig } = React.useContext(AppContext);
  const { category, onClickCategory, activeCategoryId } = props;
  const { name, attachment } = category;
  const attachmentUrl = attachment && attachment.url ? attachment.url : '';

  const color =
    currentConfig &&
    currentConfig.uiOptions &&
    currentConfig.uiOptions.colors &&
    currentConfig.uiOptions.colors.primary;

  const renderCategory = () => {
    const mode = localStorage.getItem('erxesPosMode');

    return (
      <ProductCategory
        isActive={category._id === activeCategoryId}
        onClick={() => onClickCategory(category._id)}
        color={color}
        isPortrait={mode === 'kiosk'}
      >
        <div className={mode === 'kiosk' ? 'item-list' : 'image-wrapper'}>
          <img
            src={attachmentUrl ? attachmentUrl : 'images/no-category.jpg'}
            alt={name}
          />
          <span>{name}</span>
        </div>
      </ProductCategory>
    );
  };

  return renderCategory();
}
