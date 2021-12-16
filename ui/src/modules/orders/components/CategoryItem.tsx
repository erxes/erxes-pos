import React from "react";

import { AppContext } from 'appContext';
import { ProductCategory } from "../styles";
import { FlexCenter } from "modules/common/styles/main";
import { IProductCategory } from '../types';

type Props = {
  category: IProductCategory;
  activeCategoryId: string;
  onClickCategory: (activeCategoryId: string) => void;
};

export default function CategoryItem(props: Props) {
  const { currentConfig } = React.useContext(AppContext);
  const { category, onClickCategory, activeCategoryId } = props;
  const { name, attachment } = category;
  const imgUrl = attachment && attachment.url ? attachment.url : 'https://flagcdn.com/24x18/mn.png';
  const color = currentConfig && currentConfig.uiOptions && currentConfig.uiOptions.colors && currentConfig.uiOptions.colors.primary;

  return (
    <ProductCategory
      isActive={category._id === activeCategoryId}
      onClick={() => onClickCategory(category._id)}
      color={color}
    >
      <FlexCenter>
        <img src={imgUrl} alt={name} />
        {name}
      </FlexCenter>
    </ProductCategory>
  );
}
