import React from "react";
import Modal from "react-bootstrap/Modal";
import dayjs from "dayjs";

import Icon from "modules/common/components/Icon";
import { IInvoiceCheckParams, IOrder } from "modules/orders/types";
import { InvoiceList, InvoiceListIcon } from "./styles";
import Table from "modules/common/components/table";
import { __, confirm, Alert } from "modules/common/utils";
import Button from "modules/common/components/Button";
import { formatNumber } from "modules/utils";
import Label from "modules/common/components/Label";

type Props = {
  order: IOrder;
  cancelQPayInvoice: (id: string) => void;
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
};

type State = {
  showModal: boolean;
};

export default class InvoiceModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  onCancel = (item) => {
    confirm()
      .then(() => {
        this.props.cancelQPayInvoice(item._id);
        this.toggleModal();
      })
      .catch((e) => {
        Alert.error(e.message);
      });
  };

  renderList(invoice) {
    const { checkQPayInvoice, order } = this.props;

    const onCheck = () => {
      checkQPayInvoice({ orderId: order._id, _id: invoice._id });
    };

    return (
      <tr key={invoice._id}>
        <td>
          <Label lblStyle={invoice.status === "PAID" ? "success" : "warning"}>
            {invoice.status}
          </Label>
        </td>
        <td>{formatNumber(Number(invoice.amount) || 0)}₮</td>
        <td>{dayjs(invoice.createdAt).format("YY/MM/DD")}</td>
        <td>
          {invoice.status !== "PAID" && (
            <Button
              size="small"
              btnStyle="warning"
              icon="check-1"
              onClick={onCheck}
            >
              {__("Check")}
            </Button>
          )}
          <Button
            size="small"
            btnStyle="danger"
            icon="cancel-1"
            onClick={() => this.onCancel(invoice)}
          >
            {__("Cancel1")}
          </Button>
        </td>
      </tr>
    );
  }

  renderContent() {
    const { qpayInvoices = [] } = this.props.order || ({} as IOrder);

    return (
      <InvoiceList>
        <Table hover={true} bordered={true} responsive={true}>
          <thead>
            <tr>
              <th>{__("Status")}</th>
              <th>{__("Amount")}</th>
              <th>{__("Date")}</th>
              <th>{__("Actions")}</th>
            </tr>
          </thead>
          <tbody>
            {qpayInvoices.map((invoice) => this.renderList(invoice))}
          </tbody>
        </Table>
      </InvoiceList>
    );
  }

  render() {
    const { order } = this.props;

    if ((order.qpayInvoices || []).length === 0) {
      return null;
    }

    return (
      <>
        <InvoiceListIcon onClick={this.toggleModal}>
          <Icon icon="list-ul" />
        </InvoiceListIcon>
        <Modal
          enforceFocus={false}
          onHide={this.toggleModal}
          show={this.state.showModal}
          animation={false}
          size="lg"
        >
          {this.renderContent()}
        </Modal>
      </>
    );
  }
}
