import React from "react";
import dayjs from "dayjs";

import { IOrder } from "modules/orders/types";
import { ICustomer } from "../../types";
import { IUser } from "modules/auth/types";
import { HeaderWrapper } from "./styles";

type Props = {
  ebarimt?: any;
  ebarimtError?: any;
  order: IOrder;
  logo: string;
  name: string;
};

export default class Header extends React.Component<Props> {
  renderField(text, data) {
    if (text && data) {
      return (
        <p>
          <b>{text}:</b> {data}
        </p>
      );
    }

    return null;
  }

  renderCustomer(customer?: ICustomer) {
    if (!customer) {
      return null;
    }

    return (
      <p className="customer">
        <b>Харилцагч:</b>
        {customer.code ? <span>Код: {customer.code}</span> : null}
        <span>Нэр: {customer.firstName}</span>
      </p>
    );
  }

  renderWorker(worker: IUser) {
    if (!worker) {
      return null;
    }

    return (
      <p className="worker">
        <b>Ажилтан: </b>
        <span>{worker.details ? worker.details.fullName : worker.email}</span>
      </p>
    );
  }

  render() {
    const { order, ebarimt, ebarimtError, logo, name } = this.props;

    return (
      <HeaderWrapper className="block">
        <div className="receipt-logo">
          <img src={logo} alt={name} />
          <h5><b>{name}</b></h5>
        </div>
        {ebarimtError ? <div>{ebarimtError}</div> : null}
        <div className="header">
          <p>
            <b>&#8470;:</b>
            <span className="order-number">{order.number}</span>
          </p>
          <div className="ebarimt">
            {this.renderField("ТТД", ebarimt && ebarimt.ttd)}
            {this.renderField(
              "ДДТД",
              (ebarimt && ebarimt.billId) || order.billId
            )}
          </div>
          <p>
            <b>Огноо:</b>
            {order.paidDate ? (
              <span>{dayjs(order.paidDate).format("YYYY.MM.DD HH:mm")}</span>
            ) : null}
          </p>
          {this.renderWorker(order.user)}

          {this.renderCustomer(order.customer)}
          <div className="clearfix" />
        </div>
      </HeaderWrapper>
    );
  } // end render()
}
