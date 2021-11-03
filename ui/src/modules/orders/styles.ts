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

export const ProductCategory = styledTS<{ isActive?: boolean }>(styled.div)`
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  font-size: 11px;
  font-weight: 500;
  margin: 0 10px 10px 0;
  padding: ${dimensions.unitSpacing}px 15px;
  background: ${(props) =>
    props.isActive ? colors.colorSecondary : colors.colorWhite};
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

  > div {
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
  }

  &:hover {
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.28);
  }

  @media (min-width: 480px) {
    flex-basis: 50%;
  }

  @media (min-width: 768px) {
    flex-basis: 33.3333333%;
  }

  @media (min-width: 1170px) {
    flex-basis: 25%;
  }

  @media (min-width: 1400px) {
    flex-basis: 22%;
  }
`;

export const ProductLabel = styled.div`
  background: ${colors.colorSecondary}
  color: ${colors.colorWhite};
  padding: 12px 15px;
  border-radius: 5px;
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
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
