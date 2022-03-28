import React from 'react';

import Button from 'modules/common/components/Button';
import { __ } from 'modules/common/utils';
import CashInput from './CashInput';
import { FlexCenter } from 'modules/common/styles/main';
import { IOrder, IPaymentInput } from 'modules/orders/types';
import FormGroup from 'modules/common/components/form/Group';
import { MarginTop } from 'modules/orders/styles';

type Props = {
  order: IOrder;
  remainder: number;
  cashAmount: number;
  // setState: (param: object) => void;
  setAmount: (num: number | string) => void;
  addPayment: (params: IPaymentInput) => void;
};

export default class CashSection extends React.Component<Props> {
  render() {
    // TODO show remainder amount
    const { order, cashAmount, setAmount, addPayment } = this.props;

    const onClick = () => {
      addPayment({ _id: order._id, cashAmount });
    }
    
    return (
      <>
        <FlexCenter>
          <FormGroup>
            <CashInput
              order={order}
              setAmount={setAmount}
              amount={cashAmount}
              inputLabel={__('In Cash')}
            />
          </FormGroup>
          {cashAmount ? (
            <MarginTop margin={20}>
              <Button
                size="small"
                btnStyle="warning"
                onClick={onClick}
              >
                {__('Pay bill')}
              </Button>
            </MarginTop>
            ) : null}
        </FlexCenter>
      </>
    );
  }
}
