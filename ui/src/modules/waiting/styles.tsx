import styled from "styled-components";
import styledTS from "styled-components-ts";
import { dimensions, colors } from "modules/common/styles";
import { FlexCenter } from "modules/common/styles/main";

export const Label = styledTS<{ isReady?: boolean }>(styled.div)`
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.isReady ? colors.colorCoreGreen : colors.colorCoreOrange};
  color: ${colors.colorWhite};
  margin-bottom: ${dimensions.coreSpacing}px;
  border-radius: ${dimensions.unitSpacing}px;
  padding: ${dimensions.unitSpacing}px ${dimensions.coreSpacing}px;

  span {
    width: 100%;
    text-align: center;
    font-size: 22px;
    font-weight: 500;
  }
`;

export const Orders = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const OrderCard = styled(FlexCenter)`
  background: ${colors.bgActive};
  border: 1px solid ${colors.borderPrimary};
  border-radius: 4px;
  width: 30%;
  font-size: 80px;
  font-weight: 700;
  padding: 20px;
  margin: 0 20px 20px 0;

  @media (max-width: 1200px) {
    width: 25%;
  }
`;
