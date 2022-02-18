import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { slideDown } from 'modules/common/styles/animations';
import { colors } from 'modules/common/styles';
import { rgba } from 'modules/common/styles/ecolor';
import { FlexCenter } from 'modules/common/styles/main';

export const LogoWrapper = styledTS<{ odd?: boolean }>(styled.div)`
  display: flex;
  justify-content: space-between;
  padding: ${props => (props.odd ? '40px 0 20px' : '20px')};
  height: 273px;

  img {
    width: 439px;
    height: 113px;
    margin-left: 64px;
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
  background: ${props => (props.color ? props.color : colors.colorSecondary)}
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
 border: 1px solid ${props =>
   props.color ? props.color : colors.colorSecondary};
   border-radius: 8px;
   background: ${props =>
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
    width: 250px;

    &:first-child {
      margin-right: 50px;
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
