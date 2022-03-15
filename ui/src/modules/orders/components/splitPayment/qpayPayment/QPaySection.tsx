import React from 'react';
import {
  IInvoiceCheckParams,
  IInvoiceParams,
  IOrder
} from 'modules/orders/types';
import { CardInputColumn, Input } from 'modules/orders/styles';
import QPayRow from './QPayRow';
import { __ } from 'modules/common/utils';
// import SplitQPayForm from './SplitQPayForm';
import FormGroup from 'modules/common/components/form/Group';
import ControlLabel from 'modules/common/components/form/Label';
import NumberFormat from 'react-number-format';
import Icon from 'modules/common/components/Icon';

type Props = {
  order: IOrder;
  billType: string;
  createQPayInvoice: (params: IInvoiceParams) => void;
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
  cancelQPayInvoice: (id: string) => void;
  maxAmount?: number;
  remainder?: number;
  amount?: number;
};

type State = {
  amount: number;
};

export default class QPaySection extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      amount: props.maxAmount || 0
    };
  }

  render() {
    const {
      order,
      // billType,
      // createQPayInvoice,
      checkQPayInvoice,
      cancelQPayInvoice,
      maxAmount = 0
    } = this.props;

    const { qpayInvoices = [] } = order;
    const { amount } = this.state;

    const handleInput = (value: number | undefined = 0) => {
      // do not accept amount greater than payable amount
      const val = Number((value > maxAmount ? maxAmount : value).toFixed(2));

      this.setState({ amount: val });
    };

    // const content = props => (
    //   <SplitQPayForm
    //     {...props}
    //     order={order}
    //     billType={billType}
    //     createQPayInvoice={createQPayInvoice}
    //     maxAmount={maxAmount}
    //   />
    // );

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: '₮',
      inputMode: 'numeric'
    };

    const resetInput = () => {
      this.setState({ amount: 0 });
    };

    return (
      <div>
        <CardInputColumn>
          <FormGroup>
            <ControlLabel>{__('Pay with QPay')}</ControlLabel>
            <Input>
              <NumberFormat
                name="qpayAmount"
                value={amount}
                onValueChange={values => handleInput(values.floatValue)}
                {...inputProps}
              />
              <div onClick={resetInput}>
                <Icon icon="cancel" size={13} />
              </div>
            </Input>
          </FormGroup>
          {qpayInvoices
            ? qpayInvoices.map(c => (
                <QPayRow
                  item={c}
                  key={c._id}
                  checkQPayInvoice={checkQPayInvoice}
                  cancelQPayInvoice={cancelQPayInvoice}
                  orderId={order._id}
                />
              ))
            : null}
        </CardInputColumn>
      </div>
    );
  }
}
