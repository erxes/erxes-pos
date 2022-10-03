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
  receivableAmount: number;
  setAmount: (num: number | string) => void;
  addPayment: (params: IPaymentInput, callback?: () => void) => void;
};

export default class ReceivableSection extends React.Component<Props> {
  render() {
    const { order, receivableAmount, setAmount, addPayment, remainder } = this.props;

    const onClick = () => {
      const amount = receivableAmount > remainder ? remainder : receivableAmount;

      addPayment({ _id: order._id, receivableAmount: amount }, () => {
        setAmount(0);
      });
    };

    return (
      <FlexCenter>
        <CardInputColumn>
          <CashInput
            order={order}
            setAmount={setAmount}
            amount={receivableAmount}
            inputLabel={__("In Receivable")}
            max={remainder}
          />

          {receivableAmount ? (
            <React.Fragment>
              <Button
                size="small"
                btnStyle="warning"
                onClick={onClick}
                block={true}
              >
                {__("Pay bill")}
              </Button>
            </React.Fragment>
          ) : null}
        </CardInputColumn>
      </FlexCenter>
    );
  }
}
