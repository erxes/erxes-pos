import React from 'react';
import styled from "styled-components";
import styledTS from "styled-components-ts";

import { FlexCenter } from "modules/common/styles/main";

const Pad = styledTS<{ isPortrait?: boolean }>(styled(FlexCenter))`
  width: ${(props) => (props.isPortrait ? "140px" : "95px")}
  height: ${(props) => (props.isPortrait ? "140px" : "95px")}
  border-radius: ${(props) => (props.isPortrait ? "140px" : "95px")}
  line-height: ${(props) => (props.isPortrait ? "140px" : "95px")}
  background: #eee;
  margin: 8px;
  font-size: ${(props) => (props.isPortrait ? "42px" : "32px")};
  font-weight: 600;
  cursor: pointer;
  @media (max-width: 1600px) and (orientation:landscape) {
    width: 70px;
    height: 70px;
    border-radius: 70px;
    line-height: 70px;
    font-size: 28px;
  }
`;

type Props = {
  num: string;
  isPortrait: boolean | undefined;
  onClick: (val: string) => void;
}

export default function KeyPad({ num, onClick, isPortrait }: Props) {
  return (
    <Pad onClick={() => onClick(num.toString())} isPortrait={isPortrait}>{num}</Pad>
  );
};
