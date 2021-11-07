import React from "react";
import { ProductCategory } from "../styles";
import { FlexCenter } from "modules/common/styles/main";

type Props = {
  category: any;
  options: any;
  activeCategoryId: string;
  onClickCategory: (activeCategoryId: string) => void;
};

export default function CategoryItem(props: Props) {
  const { category, onClickCategory, activeCategoryId, options } = props;
  const { name } = category;

  return (
    <ProductCategory
      isActive={category._id === activeCategoryId}
      onClick={() => onClickCategory(category._id)}
      color={options.colors.primary}
    >
      <FlexCenter>
        <img src="https://flagcdn.com/24x18/mn.png" alt={name} />
        {name}
      </FlexCenter>
    </ProductCategory>
  );
}
