import React from "react";
import Modal from "react-bootstrap/Modal";

import { __, confirm, Alert } from "modules/common/utils";
import { IInvoiceCheckParams, IOrder } from "modules/orders/types";
import QPayRow from "./QPayRow";
import { IQPayInvoice } from "modules/qpay/types";

type Props = {
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
  cancelQPayInvoice: (id: string) => void;
  order: IOrder;
  showModal: boolean;
  toggleModal: () => void;
  invoice: IQPayInvoice | null;
  setInvoice: (invoice: IQPayInvoice) => void;
  refetchOrder: () => void;
};

export default class QPayModalContent extends React.Component<Props> {
  onHide = () => {
    const { invoice, cancelQPayInvoice, toggleModal } = this.props;

    if (!invoice) {
      return;
    }

    confirm()
      .then(() => {
        cancelQPayInvoice(invoice._id);
        toggleModal();
      })
      .catch((e) => {
        Alert.error(e.message);
      });
  };

  renderContent() {
    const {
      cancelQPayInvoice,
      checkQPayInvoice,
      order,
      toggleModal,
      invoice,
      setInvoice,
      refetchOrder,
    } = this.props;

    const { _id } = order;

    if (!invoice) {
      return null;
    }

    return (
      <QPayRow
        item={invoice}
        key={invoice._id}
        checkQPayInvoice={checkQPayInvoice}
        cancelQPayInvoice={cancelQPayInvoice}
        orderId={_id}
        toggleModal={toggleModal}
        setInvoice={setInvoice}
        refetchOrder={refetchOrder}
      />
    );
  }

  render() {
    const { showModal } = this.props;

    return (
      <Modal
        enforceFocus={false}
        onHide={this.onHide}
        show={showModal}
        animation={false}
      >
        {this.renderContent()}
      </Modal>
    );
  }
}
