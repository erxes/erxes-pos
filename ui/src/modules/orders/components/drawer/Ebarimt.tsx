import React from "react";

import { __ } from "modules/common/utils";
import Button from "modules/common/components/Button";
import { EbarimtButton } from "../kiosk/style";
import { FlexCenter } from "modules/common/styles/main";
import { BILL_TYPES } from "./KioskPaymentForm";

type Props = {
  billType: string;
  isPortrait: boolean | undefined;
  show: boolean;
  onBillTypeChange: (e: any) => void;
  onStateChange: (key: string, value: any) => void;
};

type State = {
  selectedEbarimtType: string;
};

export default class Ebarimt extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedEbarimtType: BILL_TYPES.CITIZEN,
    };
  }

  onChange = (value) => {
    this.setState({ selectedEbarimtType: value });
    this.props.onBillTypeChange(value);
  };

  render() {
    const { isPortrait, onBillTypeChange } = this.props;
    const { selectedEbarimtType } = this.state;

    return (
      <>
        <FlexCenter>
          <h2>{__("Obtain a VAT receipt")}</h2>
        </FlexCenter>
        <EbarimtButton isPortrait={isPortrait}>
          <Button
            className={
              selectedEbarimtType === BILL_TYPES.CITIZEN ? "active" : ""
            }
            onClick={() => this.onChange(BILL_TYPES.CITIZEN)}
            size="large"
          >
            {__("Person")}
          </Button>
          <Button
            className={
              selectedEbarimtType === BILL_TYPES.ENTITY ? "active" : ""
            }
            onClick={() => this.onChange(BILL_TYPES.ENTITY)}
            onMouseDown={onBillTypeChange}
            size="large"
          >
            {__("Organization")}
          </Button>
        </EbarimtButton>
      </>
    );
  } // end render()
}