import React from "react";

import Button from "modules/common/components/Button";
import { __ } from "modules/common/utils";
import CashInput from "./CashInput";
import { IOrder, IPaymentInput } from "modules/orders/types";
import { CardInputColumn } from "modules/orders/styles";
import { FlexCenter } from "modules/common/styles/main";

type Props = {
  order: IOrder;
  remainder: number;
  cashAmount: number;
  // setState: (param: object) => void;
  setAmount: (num: number | string) => void;
  addPayment: (params: IPaymentInput, callback?: () => void) => void;
  // onCallback: (type: string) => void;
};

export default class CashSection extends React.Component<Props> {
  render() {
    // TODO show remainder amount
    const { order, cashAmount, setAmount, addPayment } = this.props;

    const onClick = () => {
      addPayment({ _id: order._id, cashAmount }, () => {
        setAmount(0);
      });
    };

    return (
      <FlexCenter>
        <CardInputColumn>
          <CashInput
            order={order}
            setAmount={setAmount}
            amount={cashAmount}
            inputLabel={__("In Cash")}
          />

          {cashAmount ? (
            <Button
              size="small"
              btnStyle="warning"
              onClick={onClick}
              block={true}
            >
              {__("Pay bill")}
            </Button>
          ) : null}
        </CardInputColumn>
      </FlexCenter>
    );
  }
}
