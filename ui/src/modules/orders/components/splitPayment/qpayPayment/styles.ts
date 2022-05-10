import { colors, dimensions } from "modules/common/styles";
import styled from "styled-components";

export const QPayWrapper = styled.div`
  padding: ${dimensions.coreSpacing + dimensions.unitSpacing}px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h4 {
    padding: 0 ${dimensions.coreSpacing + dimensions.coreSpacing}px;
  }

  h5 {
    display: flex;
    align-items: center;

    .icon-wrapper {
      margin-right: ${dimensions.unitSpacing}px;
      background: ${colors.colorCoreGreen};
      color: ${colors.colorWhite};
      padding: 3px;
      border-radius: 50%;
    }
  }
`;

export const TotalAmount = styled.div`
  margin: ${dimensions.unitSpacing}px 0;

  span {
    margin-left: ${dimensions.unitSpacing}px;
  }
`;
