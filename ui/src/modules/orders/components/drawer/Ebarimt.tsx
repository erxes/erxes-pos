import React from 'react';
import styledTS from "styled-components-ts";
import styled from "styled-components";

import FormControl from "modules/common/components/form/Control";
import ControlLabel from "modules/common/components/form/Label";
import { FlexCenter } from "modules/common/styles/main";
import Toggle from "modules/common/components/Toggle";
import { __ } from "modules/common/utils";
import { BILL_TYPES } from '../../../../constants';

const HeaderRow = styledTS<{ isPortrait?: boolean }>(styled(FlexCenter))`
  justify-content: flex-start;
  margin-bottom: 20px;
  margin: ${(props) => props.isPortrait && "30px 0 30px 0"};
`;

type Props = {
  billType: string;
  isPortrait: boolean | undefined;
  show: boolean;
  onBillTypeChange: (e: any) => void;
  onStateChange: (key: string, value: any) => void;
}

export default class Ebarimt extends React.Component<Props> {
  render() {
    const { billType, isPortrait, show, onBillTypeChange, onStateChange } = this.props;

    const onSwitchHandler = (e) => {
      onStateChange('showE', e.target.checked);
    };

    return (
      <React.Fragment>
        <HeaderRow isPortrait={isPortrait}>
          <ControlLabel>{__("E-barimt")}:</ControlLabel> &ensp;
          <Toggle
            checked={show}
            icons={{
              checked: <span>Yes</span>,
              unchecked: <span>No</span>,
            }}
            onChange={onSwitchHandler}
          />
        </HeaderRow>
        {show && (
          <>
            <FormControl
              componentClass="radio"
              value={BILL_TYPES.CITIZEN}
              inline={true}
              name="billType"
              checked={billType === BILL_TYPES.CITIZEN}
              onChange={onBillTypeChange}
            >
              {__("Person")}
            </FormControl>
            &ensp;&ensp;
            <FormControl
              componentClass="radio"
              value={BILL_TYPES.ENTITY}
              inline={true}
              name="billType"
              checked={billType === BILL_TYPES.ENTITY}
              onChange={onBillTypeChange}
            >
              {__("Organization")}
            </FormControl>
          </>
        )}
      </React.Fragment>
    );
  } // end render()
}
