import styled from "styled-components";
import styledTS from "styled-components-ts";
import { dimensions, colors } from "modules/common/styles";
import { rgba } from "modules/common/styles/ecolor";

export const TableRow = styledTS<{ color?: string; background?: string }>(
  styled.tr
)`
  background: ${(props) =>
    props.background ? rgba(props.background, 0.07) : colors.colorShadowGray};

  .number {
    font-size: 20px;
    font-weight: 600;
  }
`;

export const Detail = styled.div`
  display: flex;
  align-items: center;
  line-height: 25px;

  p {
    margin: 0;
    font-size: 18px;
    line-height: 18px;
    font-weight: 500;
    min-width: 250px;
    max-width: 400px;
    margin-right: ${dimensions.unitSpacing}px;
  }
`;

export const TimeGroup = styled.div`
  font-size: 18px;
  font-weight: 400;
`;

export const Status = styledTS<{ color?: string; odd?: boolean }>(styled.span)`

  color: ${(props) => (props.color ? props.color : colors.colorSecondary)};
  border: 1px solid ${(props) =>
    props.color ? props.color : colors.colorSecondary};
  padding: 6px 12px;
  border-radius: 6px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
`;

export const FlexEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: ${dimensions.coreSpacing}px;

  > div {
    width: 100%;
  }
`;

export const ScreenWrapper = styledTS<{
  color?: string;
  innerWidth?: number;
}>(styled.div)`
  margin-right: 10px;
  height: 80vh;
  overflow: auto;

  /* width */
  ::-webkit-scrollbar {
    width: ${(props) =>
      props.innerWidth ? `${props.innerWidth * 0.015}px` : ""}
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
      props.color ? props.color : colors.colorSecondary};;
  }

  table {
    padding-right: 10px;
    tr th,
    .center {
      text-align: center;
    }
  }
`;
