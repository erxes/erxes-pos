import { __ } from 'modules/common/utils';
import KeypadWithInput from './KeypadWithInput';
import React from 'react';
import { FlexCenter } from 'modules/common/styles/main';
import { IOrder } from 'modules/orders/types';
import FormGroup from 'modules/common/components/form/Group';

type Props = {
  order: IOrder;
  remainder: number;
  cashAmount: number;
  currentAmount: number | string;
  setState: (param: object) => void;
};

export default class CashSection extends React.Component<Props, { change: number }> {
  constructor(props: Props) {
    super(props);

    this.state = {
      change: 0
    };

  }

  componentDidMount() {
    const { remainder, setState } = this.props;
    setState({ cashAmount: remainder, remainder: 0 });
  }

  setAmount = (am: number | string) => {
    const { remainder, setState, cashAmount } = this.props;

    let currentAmount = am;
    let change = 0;
    let cash = currentAmount;

    const prevRem = remainder + (cashAmount || 0);
    let newRem = prevRem - Number(cash);

    if (currentAmount > prevRem) {
      change = Number(currentAmount) - prevRem
      cash = prevRem;
      newRem = 0;
    }

    this.setState({ change })
    setState({ currentAmount, cashAmount: cash, remainder: newRem });
  };

  render() {
    const { order, currentAmount } = this.props;
    const { change } = this.state;

    return (
      <>
        <FlexCenter>
          <FormGroup>
            <KeypadWithInput
              order={order}
              setAmount={this.setAmount}
              amount={currentAmount}
              inputLabel={__('In Cash')}
            />
          </FormGroup>
        </FlexCenter>
        {(change) ? <span>{__('Change amount')}: {this.state.change}</span> : ''}
      </>
    );
  }
}
