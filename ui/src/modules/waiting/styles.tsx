import styled from "styled-components";
import styledTS from "styled-components-ts";
import { dimensions, colors } from "modules/common/styles";

export const Label = styledTS<{ isReady?: boolean, color?: string }>(styled.div)`
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.color ? props.color : colors.colorCoreGreen };
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

  img {
    max-height: 40px;
    transition: all 0.3s ease;
    max-width: 40%;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const Orders = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const OrderCard = styledTS<{ color?: string }>(styled.div)`
  width: 190px;
  font-size: 70px;
  font-weight: 700;
  margin: 0 20px 20px 0;
  color: ${(props) => props.color && props.color};
`;

export const EmbedVideo = styled.div``;