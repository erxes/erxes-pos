import React from 'react';

import { AppContext } from 'appContext';
import { CategoryItems, LeftCircle, Lines, ProductCategory } from '../styles';
import { IProductCategory } from '../types';

type Props = {
  category: IProductCategory;
  activeCategoryId: string;
  orientation: string;
  onClickCategory: (activeCategoryId: string) => void;
};

export default function CategoryItem(props: Props) {
  const { currentConfig } = React.useContext(AppContext);
  const { category, onClickCategory, activeCategoryId, orientation } = props;
  const { name, attachment } = category;
  const attachmentUrl = attachment && attachment.url ? attachment.url : '';

  const color =
    currentConfig &&
    currentConfig.uiOptions &&
    currentConfig.uiOptions.colors &&
    currentConfig.uiOptions.colors.primary;

  const renderCategory = () => {
    return (
      <CategoryItems>
        <ProductCategory
          isActive={category._id === activeCategoryId}
          onClick={() => onClickCategory(category._id)}
          color={color}
          isPortrait={orientation === 'portrait'}
        >
          <div className={orientation === 'portrait' ? 'item-list' : 'image-wrapper'}>
            <img
              src={attachmentUrl ? attachmentUrl : 'images/no-category.jpg'}
              alt={name}
            />
            <span>{name}</span>
          </div>
        </ProductCategory>
        <>
          <LeftCircle
            isActive={category._id === activeCategoryId}
          />
          <Lines isActive={category._id === activeCategoryId} />
        </>
      </CategoryItems>
    );
  };

  return renderCategory();
}
