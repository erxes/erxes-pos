import styled from "styled-components";
import styledTS from "styled-components-ts";
import { dimensions, colors } from "modules/common/styles";

export const PosContainer = styled.div`
  height: 100vh;
`;

export const Column = styled.div`
  border: 1px solid #ddd;
`;

export const MainContent = styledTS<{ hasBackground?: boolean }>(styled.div)`
  padding: 20px ${dimensions.coreSpacing + 10}px;
  background: ${(props) => props.hasBackground && colors.colorWhite};
  height: 100vh;
`;
