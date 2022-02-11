import React from 'react';

import Button from 'modules/common/components/Button';
import { IOrder, ICardPayment } from 'modules/orders/types';
import CardRow from './CardRow';
import ModalTrigger from 'modules/common/components/ModalTrigger';
import Table from 'modules/common/components/table/index';
import { __ } from 'modules/common/utils';
import SplitCardForm from './SplitCardForm';

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
      <SplitCardForm {...props} order={order} addCardPayment={addCardPayment} billType={billType} />;

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Card info</th>
            </tr>
          </thead>
          <tbody>{cardPayments ? cardPayments.map(c => <CardRow item={c} key={c._id} />) : null}</tbody>
        </Table>
        <ModalTrigger
          hideHeader={true}
          title={__('Add card payment')}
          trigger={
            <Button size="small" btnStyle="success" icon="plus-circle">Add</Button>
          }
          content={content}
        />
      </div>
    );
  }
}
