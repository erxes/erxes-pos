import React from "react";

import { AppContext } from "appContext";
import { ProductCategory } from "../styles";
import { FlexCenter } from "modules/common/styles/main";
import { IProductCategory } from "../types";

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

  const imgUrl =
    attachment && attachment.url ? attachment.url : "images/no-category.jpg";

  const color =
    currentConfig &&
    currentConfig.uiOptions &&
    currentConfig.uiOptions.colors &&
    currentConfig.uiOptions.colors.primary;

  const isPortrait = orientation === "portrait";

  return (
    <ProductCategory
      isActive={category._id === activeCategoryId}
      onClick={() => onClickCategory(category._id)}
      color={color}
      isPortrait={isPortrait}
    >
      <FlexCenter>
        <div className="image-wrapper">
          <img src={imgUrl} alt={name} />
        </div>
        {name}
      </FlexCenter>
    </ProductCategory>
  );
}
