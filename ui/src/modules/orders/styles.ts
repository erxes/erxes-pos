import styled from "styled-components";
import styledTS from "styled-components-ts";
import { dimensions, colors } from "modules/common/styles";

export const PosContainer = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

export const Column = styled.div`
  border: 1px solid #ddd;
`;

export const MainContent = styledTS<{
  hasBackground?: boolean;
  noPadding?: boolean;
  hasShadow?: boolean;
}>(styled.div)`
  padding: ${(props) => (props.noPadding ? 0 : "20px 30px")};
  background: ${(props) => props.hasBackground && colors.colorWhite};
  box-shadow: ${(props) =>
    props.hasShadow && "rgb(217, 226, 236) 0px 0px 24px 0px;"};
  height: 100vh;
`;

export const ProductCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0;
`;

export const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 800px;
  overflow: auto;
`;

export const ProductCategory = styledTS<{ isActive?: boolean; color?: string }>(
  styled.div
)`
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  font-size: 11px;
  font-weight: 500;
  margin: 0 10px 10px 0;
  padding: ${dimensions.unitSpacing}px 15px;
  background: ${(props) =>
    props.isActive
      ? props.color
        ? props.color
        : colors.colorSecondary
      : colors.colorWhite};
  cursor: pointer;
  color: ${(props) => props.isActive && colors.colorWhite};
  transition: all ease .3s;

  img {
      max-width: 20px;
      max-height: 20px;
      margin-right:  ${dimensions.unitSpacing}px;
  }

  &:hover {
    box-shadow: 0 0 21px 2px rgba(0, 0, 0, 0.16);
  }
`;

export const Item = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  background: ${colors.colorWhite};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: ${dimensions.coreSpacing}px ${dimensions.unitSpacing}px;
  flex-basis: 22%;
  flex-shrink: 0;
  cursor: pointer;
  margin: 0 20px 20px 0;
  transition: all ease 0.3s;
  position: relative;

  > img {
    width: 120px;
    max-height: 120px;
  }

  > strong {
    font-size: 20px;
  }

  > h4 {
    font-size: 14px;
    margin: 10px 0 5px;
  }

  p {
    line-height: 16px;
    font-size: 12px;
    color: #888;
    margin: 0;
  }

  &:hover {
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.28);
  }

  @media (max-width: 1600px) {
    flex-basis: 30%;
  }

  @media (max-width: 1450px) {
    flex-basis: 28%;
  }

  @media (max-width: 1350px) {
    flex-basis: 45%;
  }

  @media (max-width: 1050px) {
    flex-basis: 42%;
  }
`;

export const ProductLabel = styledTS<{ color?: string }>(styled.div)`
  background: ${(props) => (props.color ? props.color : colors.colorSecondary)}
  color: ${colors.colorWhite};
  padding: 12px 15px;
  border-radius: 5px;
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
`;

export const Stages = styled.div`
  height: 100%;
`;

export const StageContent = styled.div`
  margin-top: ${dimensions.coreSpacing}px;

  > b {
    margin-bottom: ${dimensions.unitSpacing}px;
    display: block;
  }
`;

export const Drawer = styledTS<{ show: boolean }>(styled.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all ease .3s;
  display: ${(props) => !props.show && "none"};

  > div {
    height: 100%;
    width: 40%;
  }
`;

export const LeftMenuContainer = styled.div`
  position: relative;
  height: 100%;
  background: ${colors.bgLight};
  white-space: normal;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 24px -6px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
`;

export const DrawerContent = styled.div`
  padding: 30px;
`;

/**
 * Order search components shown in drawer
 */
export const Orders = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const OrderBox = styledTS<{ color?: string }>(styled.div)`
  background: #fff;
  padding: 20px;
  text-align: center;
  margin: 0 20px 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 31.333%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  > div {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 15px;

    b {
      margin-left: 5px;
      color: ${(props) => (props.color ? props.color : "#6569df")};
      word-break: break-word;
      line-height: 15px;
    }
  }

  label {
    background:${(props) => (props.color ? props.color : "#6569df")};
    color: #fff;
    padding: 5px;
    border-radius: 8px;
  }

  &:nth-child(3n) {
    margin-right: 0;
  }
`;

export const SearchInputWrapper = styledTS<{ active?: boolean; full?: boolean }>(
  styled.div
)`
  background-color: ${(props) =>
    props.active ? colors.colorWhite : colors.bgMain};
  border: 1px solid ${(props) =>
    props.active ? colors.borderDarker : colors.bgMain};
  border-radius: 35px;
  height: 32px;
  position: relative;
  transition: .3s all;
  width: ${(props) =>
    props.active
      ? props.full
        ? "100%"
        : "280px"
      : props.full
      ? "100%"
      : "120px"};
  display: flex;
  padding: 0 ${dimensions.unitSpacing}px;
  align-items: center;
  position: relative;

  > span {
    color: ${colors.colorCoreGray};
    padding-left: ${dimensions.unitSpacing}px;
  }
  
  i {
    cursor: pointer;
    color: ${colors.colorCoreDarkGray};
  }

  input {
    background: 0 0;
    border: none;
    padding: 5px ${dimensions.unitSpacing}px;
    flex: 1;
    height: 100%;
    outline: 0;

    &:focus {
      outline: 0;
    }
  }
`;
