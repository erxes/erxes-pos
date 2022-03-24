import React from "react";
import { AppContext } from "appContext";
import {
  CategoryItemWrapper,
  CategoryName,
  LeftCircle,
  Lines,
  ProductCategory,
} from "../styles";
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

  const attachmentUrl = attachment && attachment.url ? attachment.url : "";
  const isActive = category._id === activeCategoryId;

  const color =
    currentConfig &&
    currentConfig.uiOptions &&
    currentConfig.uiOptions.colors &&
    currentConfig.uiOptions.colors.primary;

  return (
    <CategoryItemWrapper
      color={color}
      onClick={() => onClickCategory(category._id)}
    >
      <ProductCategory
        isActive={isActive}
        color={color}
        isPortrait={orientation === "portrait"}
      >
        <CategoryName>
          <img
            src={attachmentUrl ? attachmentUrl : "images/no-category.jpg"}
            alt={name}
          />
          <span>{name}</span>
        </CategoryName>
      </ProductCategory>
      <LeftCircle isActive={isActive} color={color} />
      <Lines isActive={isActive} color={color} />
    </CategoryItemWrapper>
  );
}
