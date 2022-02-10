import React from 'react';

import Button from 'modules/common/components/Button';
import { IInvoiceCheckParams, IInvoiceParams, IOrder } from 'modules/orders/types';
import QPayRow from './QPayRow';
import ModalTrigger from 'modules/common/components/ModalTrigger';
import Table from 'modules/common/components/table/index';
import { __ } from 'modules/common/utils';
import SplitQPayForm from './SplitQPayForm';

type Props = {
  order: IOrder;
  billType: string;
  createQPayInvoice: (params: IInvoiceParams) => void;
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
}

export default class QPaySection extends React.Component<Props> {
  render() {
    const { order, billType, createQPayInvoice, checkQPayInvoice } = this.props;

    const { qpayInvoices = [] } = order;

    const content = (props) =>
      <SplitQPayForm {...props} order={order} billType={billType} createQPayInvoice={createQPayInvoice} />;

    return (
      <div>
        <Table hover={true} bordered={true} responsive={true}>
          <thead>
            <tr>
              <th>{__('Amount')}</th>
              <th>{__('Status')}</th>
              <th>{__('Scan the QR code below with payment app to continue')}</th>
              <th>{__('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {qpayInvoices ? qpayInvoices.map(c =>
              <QPayRow item={c} key={c._id} checkQPayInvoice={checkQPayInvoice} orderId={order._id} />)
              : null
            }
          </tbody>
        </Table>
        <ModalTrigger
          title={__('Add qpay invoice')}
          trigger={
            <Button size="small" btnStyle="primary" icon="plus-circle">{__('Add invoice')}</Button>
          }
          content={content}
        />
      </div>
    );
  }
}
