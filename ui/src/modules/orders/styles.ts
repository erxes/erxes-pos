import styled from "styled-components";
import styledTS from "styled-components-ts";
import { dimensions, colors } from "modules/common/styles";
import { rgba } from "modules/common/styles/ecolor";

export const PosWrapper = styled.div`
  flex: 1;
  position: relative;

  @media (max-width: 1170px) and (orientation: landscape) {
    .no-padding {
      padding: 0;
    }
  }
`;

export const Column = styled.div`
  border: 1px solid #ddd;
`;

export const StageItems = styled.div`
  overflow: auto;
  height: 85%;

  @media (orientation: portrait) {
    height: 85%;
    max-height: initial;
  }

  @media (max-width: 1170px) and (orientation: landscape) {
    max-height: 650px;
  }
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

  @media (max-width: 1170px) and (orientation:landscape) {
    padding: ${(props) => (props.noPadding ? 0 : "15px 10px")};
  }
`;

export const ProductCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0;

  @media (max-width: 1170px) and (orientation: landscape) {
    margin: 20px 0 10px 0;
  }
`;

export const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 80%;
  overflow: auto;

  @media (max-width: 1170px) and (orientation: landscape) {
    max-height: 570px;
  }

  @media (orientation: portrait) {
    max-height: 75%;
  }
`;

export const ProductCategory = styledTS<{
  isActive?: boolean;
  color?: string;
  isPortrait?: boolean;
}>(styled.div)`
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  font-size: ${(props) => (props.isPortrait ? "28px" : "11px")};
  font-weight: 500;
  margin: ${(props) => (props.isPortrait ? "0 20px 20px 0" : "0 10px 10px 0")};
  padding: ${dimensions.unitSpacing - 4}px 15px;
  background: ${(props) =>
    props.isActive
      ? props.color
        ? props.color
        : colors.colorSecondary
      : colors.colorWhite};
  cursor: pointer;
  color: ${(props) => props.isActive && colors.colorWhite};
  transition: all ease .3s;
  display: flex;

  .image-wrapper {
    width: ${(props) => (props.isPortrait ? "70px" : "30px")};
    height: ${(props) => (props.isPortrait ? "70px" : "30px")};
    margin-right:  ${dimensions.unitSpacing}px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &:hover {
    box-shadow: 0 0 21px 2px rgba(0, 0, 0, 0.16);
  }
`;

export const Item = styledTS<{ isPortrait: boolean }>(styled.div)`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  background: ${colors.colorWhite};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px;
  padding-bottom: ${(props) => props.isPortrait && "20px"};
  flex-basis: 22%;
  flex-shrink: 0;
  cursor: pointer;
  margin: 0 20px 20px 0;
  transition: all ease 0.3s;
  position: relative;

  .image-wrapper {
    width: ${(props) => (props.isPortrait ? "280px" : "120px")};
    height: ${(props) => (props.isPortrait ? "280px" : "120px")};
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    > img {
      max-width: 100%;
      max-height: 100%;
    } 

    @media (max-width: 1200px) and (orientation:landscape) {
      width: 100px;
      height: 100px;
    }
  }

  > strong {
    font-size: ${(props) => (props.isPortrait ? "38px" : "18px")};

    @media (max-width: 1170px) and (orientation:landscape) {
      font-size: 16px;
    }
  }

  > h4 {
    font-size: ${(props) => (props.isPortrait ? "26px" : "13px")};
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

  @media (max-width: 1600px) and (min-width: 1011px) and (orientation:landscape)  {
    flex-basis: 30%;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: 1010px) {
    flex-basis: 43%;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

export const ProductLabel = styledTS<{ color?: string; isPortrait?: boolean }>(
  styled.div
)`
  background: ${(props) => (props.color ? props.color : colors.colorSecondary)}
  color: ${colors.colorWhite};
  padding: 12px 15px;
  border-radius: 5px;
  font-size: ${(props) => (props.isPortrait ? "24px" : "12px")};
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
`;

export const Stages = styled.div`
  height: 100%;
`;

export const StageContent = styledTS<{ odd?: boolean }>(styled.div)`
  margin-top: ${dimensions.coreSpacing}px;
  height: ${(props) => props.odd && "100%"};

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

export const DrawerContent = styledTS<{ options?: any }>(styled.div)`
  padding: 30px;
  height: 100%;
  overflow: auto;

  .ioevLe:checked + span:before, .react-toggle--checked .react-toggle-track {
    background-color: ${(props) =>
      props.options && props.options.colors.primary} !important;
  }

  .react-toggle--checked .react-toggle-thumb, .react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    border-color: ${(props) =>
      props.options && props.options.colors.primary} !important;
  }
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
  margin: 0 15px 15px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 31.333%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => (props.color ? props.color : "#6569df")};
  }

  div {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 15px;

    span {
      font-size: 11px;
      text-transform: uppercase;
      color: #686868;
    }

    b {
      margin-left: 5px;
      color: ${(props) => (props.color ? props.color : "#6569df")};
      word-break: break-word;
      line-height: 15px;
    }
  }

  a {
    color: #444;
  }

  label {
    color: ${(props) => (props.color ? props.color : "#6569df")};
    padding: 5px;
    border-radius: 20px;
    background: ${(props) => rgba(props.color ? props.color : "#6569df", 0.2)}
  }

  @media (max-width: 1500px) {
    width: 45.333%;
  }
`;

export const SearchInputWrapper = styledTS<{
  active?: boolean;
  full?: boolean;
}>(styled.div)`
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

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    margin-bottom: 5px;
  }
`;

export const FormHead = styledTS<{ isPortrait?: boolean }>(styled.div)`
  padding: 0 30px 20px;
  font-size: ${(props) => props.isPortrait && "30px"};

  label {
    font-size: ${(props) => props.isPortrait && "24px"};

    > span {
      font-size: ${(props) => props.isPortrait && "30px"};

      &:before {
        height: ${(props) => props.isPortrait && "30px"};
    width: ${(props) => props.isPortrait && "30px"};
      }
    }
  }

  input {
    height: ${(props) => props.isPortrait && "60px"} !important;
    font-size: ${(props) => props.isPortrait && "27px"} !important;
  }

  .icon-cancel {
    font-size: ${(props) => props.isPortrait && "20px"};
  }

  button {
    font-size: ${(props) => props.isPortrait && "28px"};
  }

  .react-toggle-track {
    height: ${(props) => props.isPortrait && "40px"};
    width: ${(props) => props.isPortrait && "90px"};
  }

  .react-toggle--checked .react-toggle-thumb {
    left: ${(props) => props.isPortrait && "50px"};
  }

  .react-toggle-thumb {
    height: ${(props) => props.isPortrait && "40px"};
    width: ${(props) => props.isPortrait && "40px"};
  }

  .jbyscQ {
    margin-bottom: 20px;
  }
`;

export const Input = styledTS<{ color?: string }>(styled.div)`
  display: flex;
  align-items: center;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 3px 10px;
  flex: 1;
  margin-top: 5px;

  input {
    border: 0;
    font-size: 14px;
    display: block;
    width: 100%;
    height: 34px;
    padding: 10px 0;
    color: #444;
    background: none;
    transition: all 0.3s ease;

    &:focus {
      outline: 0;
    }
  }

  > div {
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      i {
        color: ${(props) => props.color && props.color}
      }
    }
  }
`;

export const ProductSearch = styled.div`
  width: 65%;
`;
