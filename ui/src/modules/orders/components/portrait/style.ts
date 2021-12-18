import styled from "styled-components";
import styledTS from "styled-components-ts";
import { slideDown } from "modules/common/styles/animations";
import { colors } from "modules/common/styles";
import { rgba } from "modules/common/styles/ecolor";
import { FlexCenter } from "modules/common/styles/main";

export const LogoWrapper = styledTS<{ odd?: boolean }>(styled.div)`
  text-align: center;
  padding: ${(props) => (props.odd ? "50px 0 20px" : "50px")};

  img {
    max-width: 400px;
    max-height: 220px;
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
  margin-top: 15%;

  h4 {
    font-size: 48px;
    font-weight: 600;
  }
`;

export const PortraitListWrapper = styled.div`
  background: ${colors.bgMain};
  height: 100%;

  .col-md-4 {
    width: 35% !important;
    padding-left: 0 !important;
  }

  .col-md-4,
  .col-md-8 {
    width: 64%;
    float: left;
    padding-right: 15px;
    padding-left: 15px;
    position: relative;
  }

  .row,
  .col-md-8,
  .col-md-4 {
    height: 100%;
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
  padding: 30px;
  width: 350px;
  height: 330px;
  font-weight: 500;

  > img {
    width: 150px;
    min-height: 150px;
    margin-bottom: 30px;
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
    width: 250px;

    &:first-child {
      margin-right: 50px;
    }
  }
`;

export const Products = styled.div`
  background: ${colors.colorWhite};
  height: 100%;
  padding: 0 10px;
`;

export const Title = styled.div`
  font-size: 34px;
  font-weight: 500;
  margin: 30px 0;
  text-align: center;
`;

export const PortraitStage = styled.div`
  text-align: center;

  > img {
    max-width: 200px;
    margin-top: 10px;
  }
`;

export const Empty = styled.div`
  height: 100%;

  span {
    font-size: 24px;
  }
`;
