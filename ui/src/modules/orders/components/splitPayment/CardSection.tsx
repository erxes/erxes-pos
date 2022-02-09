import React from 'react';

import Button from 'modules/common/components/Button';
import { IOrder, ICardPayment } from 'modules/orders/types';
import CardRow from './CardRow';
import ModalTrigger from 'modules/common/components/ModalTrigger';
import { __ } from 'modules/common/utils';
import SplitForm from './SplitForm';

type Props = {
  order: IOrder;
  addCardPayment: (params: ICardPayment) => void;
  billType: string;
}

export default class CardSection extends React.Component<Props> {
  render() {
    const { order, addCardPayment, billType } = this.props;

    const { cardPayments = [] } = order;

    const content = (props) => 
      <SplitForm {...props} order={order} addCardPayment={addCardPayment} billType={billType} />;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Card info</th>
            </tr>
          </thead>
          <tbody>{cardPayments ? cardPayments.map(c => <CardRow item={c} key={c._id} />) : null}</tbody>
        </table>
        <ModalTrigger
          title={__('Add card payment')}
          trigger={
            <Button size="small" btnStyle="primary" icon="plus-circle">Add</Button>
          }
          content={content}
        />
      </div>
    );
  }
}
