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
  cancelQPayInvoice: (id: string) => void;
}

export default class QPaySection extends React.Component<Props> {
  render() {
    const { order, billType, createQPayInvoice, checkQPayInvoice, cancelQPayInvoice } = this.props;

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
              <QPayRow
                item={c}
                key={c._id}
                checkQPayInvoice={checkQPayInvoice}
                cancelQPayInvoice={cancelQPayInvoice}
                orderId={order._id}
              />
            ) : null
            }
          </tbody>
        </Table>
        <ModalTrigger
          hideHeader={true}
          title={__('Create invoice')}
          trigger={
            <Button
              size="small"
              btnStyle="success"
              icon="plus-circle"
              >{__('Create invoice')}
            </Button>
          }
          content={content}
        />
      </div>
    );
  }
}
