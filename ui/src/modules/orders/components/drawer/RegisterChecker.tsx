import React from 'react';

import Button from "modules/common/components/Button";
import FormControl from "modules/common/components/form/Control";
import { FlexCenter } from "modules/common/styles/main";
import Icon from "modules/common/components/Icon";
import { __ } from "modules/common/utils";
import { Input, FormHead } from "modules/orders/styles";
import { BILL_TYPES } from './CalculationForm';

type Props = {
  show: boolean;
  billType: string;
  registerNumber: string;
  checkOrganization: () => void;
  isPortrait: boolean | undefined;
  reset: (key: string) => void;
  color: string;
  onChange: (e: any) => void;
  focusOnKeypads: () => void;
}

export default class RegisterChecker extends React.Component<Props> {
  render() {
    const { show, billType, checkOrganization, isPortrait, reset, color, registerNumber, onChange, focusOnKeypads } = this.props;

    return (
      show && billType === BILL_TYPES.ENTITY && (
        <FormHead isPortrait={isPortrait}>
          <FlexCenter>
            <Input color={color}>
              <FormControl
                type="text"
                name="registerNumber"
                onChange={(e) => onChange(e)}
                value={registerNumber}
                onClick={() => focusOnKeypads()}
              />
              <div onClick={() => reset("registerNumber")}>
                <Icon icon="cancel" size={13} />
              </div>
            </Input>
            {billType === BILL_TYPES.ENTITY && (
              <Button
                style={{ backgroundColor: color }}
                onClick={() => checkOrganization()}
              >
                {__("Check")}
              </Button>
            )}
          </FlexCenter>
        </FormHead>
      )
    );
  } // end render()
}
