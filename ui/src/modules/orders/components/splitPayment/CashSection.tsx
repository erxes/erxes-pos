import { __ } from 'modules/common/utils';
import KeypadWithInput from './CashInput';
import React from 'react';
import { FlexCenter } from 'modules/common/styles/main';
import { IOrder } from 'modules/orders/types';
import FormGroup from 'modules/common/components/form/Group';

type Props = {
  order: IOrder;
  remainder: number;
  cashAmount: number;
  // setState: (param: object) => void;
  setAmount: (num: number | string) => void;
};

export default class CashSection extends React.Component<Props> {
  render() {
    // TODO show remainder amount
    const { order, cashAmount, setAmount } = this.props;

    return (
      <>
        <FlexCenter>
          <FormGroup>
            <KeypadWithInput
              order={order}
              setAmount={setAmount}
              amount={cashAmount}
              inputLabel={__('In Cash')}
            />
          </FormGroup>
        </FlexCenter>
      </>
    );
  }
}
