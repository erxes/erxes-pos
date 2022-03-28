import styled from "styled-components";
import styledTS from "styled-components-ts";
import { slideDown } from "modules/common/styles/animations";
import { colors, dimensions } from "modules/common/styles";
import { rgba } from "modules/common/styles/ecolor";
import { FlexCenter } from "modules/common/styles/main";

export const LogoWrapper = styledTS<{ odd?: boolean }>(styled.div)`
  display: flex;
  justify-content: center;
  padding: ${(props) => (props.odd ? "40px 0 20px" : "20px")};
  height: 273px;

  img {
    height: 113px;
    margin-top: 64px;
  }
`;

export const Settings = styled.div`
  display: flex;
  text-align: right;
  width: 55px;
  height: 56px;
  background: #ff7800;
  border-radius: 10px;
  margin-right: 64px;
  margin-top: 64px;

  i {
    padding: 18px;
    align-items: center;
    display: flex;
  }
`;

export const Footer = styledTS<{ color?: string }>(styled.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${(props) => (props.color ? props.color : colors.colorSecondary)}
  color: ${colors.colorWhite};
  border-radius: 28px 28px 0px 0px;
  padding: 20px 40px;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;

  span {
    margin-right: 30px;
  }
`;

export const ChooseType = styled.div`
  text-align: center;
  margin-top: 0;

  h4 {
    font-size: 48px;
    font-weight: 600;
  }
`;

export const PortraitViewWrapper = styled.div`
  background: url(images/portrait.svg);
  background-repeat: no-repeat;
  height: 100%;
  position: relative;
  font-size: 34px;

  > img {
    height: 120px;
    animation: ${slideDown} 0.5s linear;
  }
`;

export const Type = styledTS<{ color?: string }>(styled(FlexCenter))`
 border: 1px solid ${(props) =>
   props.color ? props.color : colors.colorSecondary};
   border-radius: 8px;
   background: ${(props) =>
     rgba(props.color ? props.color : colors.colorSecondary, 0.08)};
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 250px;
  height: 186px;
  font-weight: 500;
  font-size: 24px;

  > img {
    width: 95px;
    min-height: 95px;
    margin-bottom: 20px;
  }

   &:first-child {
     margin-right: 30px;
   }
`;

export const AppWrapper = styled.div`
  margin: 60px 0;

  > img {
    width: 600px;
    margin-bottom: 20px;
  }

  .app-download {
    margin-top: 20px;
    width: 150px;

    &:first-child {
      margin-right: 10px;
    }
  }
`;

export const PortraitStage = styled.div`
  padding-right: 50px;
  justify-content: space-between;
  text-align: center;

  > img {
    max-width: 200px;
    max-height: 200px;
    margin-top: 10px;
  }
`;

export const KioskStageContent = styledTS<{
  color?: string;
  innerWidth?: number;
}>(styled.div)`
  display: flex;
  margin: 30px;
  width: 100%;

  /* width */
  ::-webkit-scrollbar {
    width: ${(props) =>
      props.innerWidth ? `${props.innerWidth * 0.01}px` : "6px"};
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.color ? props.color : colors.colorSecondary};
    border-radius: 40px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) =>
      props.color ? props.color : colors.colorSecondary};
  }
`;

export const SelectedItem = styledTS<{ color?: string }>(styled.div)`
  width: 210px;
  height: 210px;
  border: 1px solid ${(props) =>
    props.color ? props.color : colors.colorSecondary};
  box-sizing: border-box;
  border-radius: 16px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
`;

export const SelectedStage = styled.div`
  min-width: 210px;
  max-height: 210px;
  text-align: center;
  position: relative;
  padding: 5px;
  flex: 1;

  i {
    font-size: 20px;
    cursor: pointer;
    margin-right: 10px;
    position: absolute;
    right: 0;
    top: 6px;
  }

  .image-wrapper {
    img {
      width: 90px;
      height: 90px;
    }
  }

  .text-wrapper {
    text-align: center;
    line-height: ${dimensions.coreSpacing}px;
    font-size: 16px;
    padding-top: ${dimensions.unitSpacing}px;

    span {
      color: #616e7c;
      font-weight: 600;

      b {
        color: #ff7800;
      }
    }
  }

  .count-wrapper {
    margin-top: 5px;

    button {
      padding: 0px 20px;
      border-radius: 8px;
      background: #fff;
      font-weight: 600;
      border: 1px solid #616e7c;
      color: #616e7c;
      margin-right: 5px;
      cursor: pointer;
    }

    .active {
      border: 1px solid #ff7800;
      color: #ff7800;
    }
  }
`;

export const CloseIcon = styled.div`
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: all ease 0.3s;
  font-size: 14px;
  cursor: pointer;
`;

export const FlexColumn = styled.div`
  display: flex;
  overflow-x: auto;
  max-width: 70%;
`;

export const TypeButtons = styled.div`
  button {
    margin-left: 0;
    margin-top: 10px;
    height: 60px;
  }
`;

const style = `
  color: #fff !important;
  background: #616E7C;`;

export const EbarimtButton = styledTS<{
  isPortrait?: boolean;
}>(styled(FlexCenter))`
  justify-content: center;
  margin: ${(props) => props.isPortrait && "5px 0 30px 0"};
  font-size: 18px;
  padding: 0 5px;

  button {
    width: 49%;
    padding: 20px 20px;
    background-color: ${colors.colorWhite};
    border: 1px solid #616E7C;
    color: #616E7C !important;

    &:hover {
      ${style}
    }
  }

  .active {
    ${style}
  }

`;

export const KioskAmount = styledTS<{ color?: string }>(styled.div)`
  border: 1px solid ${(props) => props.color && props.color};
  border-radius: 8px;
  padding: 10px;
  margin: 20px 0  10px 0;
  font-size: 18px;

  .total-wrapper {
    text-align: center;
    display: flex;
    justify-content: space-between;

    span {
      font-weight: 600;
    }
  }
`;

export const PaymentWrapper = styledTS<{ isPortrait?: boolean }>(styled.div)`
  margin:  ${(props) => (props.isPortrait ? "30px 20px 20px;" : "10px 0")};
  text-align: center;

  button {
    padding: ${(props) => (props.isPortrait ? "20px 15px" : "10px 20px")};
    border-radius: 8px;
    font-size: ${(props) => props.isPortrait && "20px"};
    width: 50%;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;

export const Header = styled.div`
  margin: 0px 20px 20px;
  @media (max-width: 1600px) and (orientation: landscape) {
    margin: 0px 20px 0px;
  }
`;
