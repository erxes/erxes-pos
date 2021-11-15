import React from "react";
import { ProductCategory } from "../styles";
import { FlexCenter } from "modules/common/styles/main";
import { IProductCategory } from '../types';

type Props = {
  category: IProductCategory;
  options: any;
  activeCategoryId: string;
  onClickCategory: (activeCategoryId: string) => void;
};

export default function CategoryItem(props: Props) {
  const { category, onClickCategory, activeCategoryId, options } = props;
  const { name, attachment } = category;
  const imgUrl = attachment && attachment.url ? attachment.url : 'https://flagcdn.com/24x18/mn.png';

  return (
    <ProductCategory
      isActive={category._id === activeCategoryId}
      onClick={() => onClickCategory(category._id)}
      color={options.colors.primary}
    >
      <FlexCenter>
        <img src={imgUrl} alt={name} />
        {name}
      </FlexCenter>
    </ProductCategory>
  );
}
