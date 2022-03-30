import React from 'react';
import Modal from "react-bootstrap/Modal";

import { __ } from 'modules/common/utils';
import Table from 'modules/common/components/table/index';
import { IInvoiceCheckParams, IOrder } from 'modules/orders/types';
import QPayRow from './QPayRow';
import { IQPayInvoice } from 'modules/qpay/types';

type Props = {
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
  cancelQPayInvoice: (id: string) => void;
  order: IOrder;
  showModal: boolean;
  toggleModal: () => void;
  invoice: IQPayInvoice | null;
  setInvoice: (invoice: IQPayInvoice) => void;
}

export default class QPayModalContent extends React.Component<Props> {
  render() {
    const { cancelQPayInvoice, checkQPayInvoice, order, toggleModal, showModal, invoice, setInvoice } = this.props;

    const { _id } = order;

    return (
      <Modal
        enforceFocus={false}
        onHide={toggleModal}
        show={showModal}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{__('Invoices')}</Modal.Title>
        </Modal.Header>
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
            {invoice &&
              <QPayRow
                item={invoice}
                key={invoice._id}
                checkQPayInvoice={checkQPayInvoice}
                cancelQPayInvoice={cancelQPayInvoice}
                orderId={_id}
                toggleModal={toggleModal}
                setInvoice={setInvoice}
              />}
          </tbody>
        </Table>
      </Modal>
    );
  }
}
