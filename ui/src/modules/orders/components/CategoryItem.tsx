import React from "react";
import { ProductCategory } from "../styles";
import { FlexCenter } from "modules/common/styles/main";

type Props = {
  category: any;
};

export default function CategoryItem(props: Props) {
  const { category } = props;
  const { name } = category;

  return (
    <ProductCategory>
      <FlexCenter>
        <img src="https://flagcdn.com/24x18/mn.png" alt={name} />
        {name}
      </FlexCenter>
    </ProductCategory>
  );
}
