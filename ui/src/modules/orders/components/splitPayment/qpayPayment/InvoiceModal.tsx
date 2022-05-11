import React from "react";
import Modal from "react-bootstrap/Modal";
import dayjs from "dayjs";

import Icon from "modules/common/components/Icon";
import { IOrder, IQPayInvoice } from "modules/orders/types";
import { InvoiceList, InvoiceListIcon } from "./styles";
import Table from "modules/common/components/table";
import { __ } from "modules/common/utils";
import Button from "modules/common/components/Button";
import { formatNumber } from "modules/utils";
import Label from "modules/common/components/Label";

type Props = {
  order: IOrder;
  toggleQPayModal: (invoce: IQPayInvoice) => void;
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

  renderList(invoice) {
    const isSuccess = invoice.status === "PAID" ? "success" : "warning";

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
          <Button
            size="small"
            btnStyle="warning"
            icon={isSuccess ? "check-1" : "eye"}
            onClick={() =>
              isSuccess ? this.props.toggleQPayModal(invoice) : {}
            }
          >
            {isSuccess ? __("Success") : __("Show")}
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
