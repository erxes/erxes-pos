import styled from "styled-components";
import styledTS from "styled-components-ts";
import { dimensions, colors } from "modules/common/styles";
import { rgba } from "modules/common/styles/ecolor";

export const TableRow = styledTS<{ color?: string }>(styled.tr)`
  background: ${(props) =>
    props.color ? rgba(props.color, 0.08) : colors.colorShadowGray};

  .number {
    font-size: 20px;
    font-weight: 600;
  }
`;

export const Detail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${dimensions.unitSpacing}px;
  line-height: 15px;

  p {
    margin: 0;
    font-weight: 500;
    min-width: 120px;
    max-width: 300px;
    margin-right: ${dimensions.unitSpacing}px;
  }
`;

export const Status = styledTS<{ color?: string; odd?: boolean }>(styled.span)`
  background: ${(props) =>
    props.odd
      ? colors.colorWhite
      : props.color
      ? props.color
      : colors.colorShadowGray};
  color: ${(props) =>
    props.odd
      ? props.color
        ? props.color
        : colors.colorSecondary
      : colors.colorWhite};
  border: 1px solid ${(props) =>
    props.odd
      ? props.color
        ? props.color
        : colors.colorSecondary
      : props.color};
  padding: 6px 12px;
  border-radius: 6px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
`;

export const FlexEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${dimensions.coreSpacing}px;

  > div {
    width: 40%;
  }
`;

export const ScreenWrapper = styled.div`
  table {
    overflow: auto;

    tr th,
    .center {
      text-align: center;
    }
  }
`;