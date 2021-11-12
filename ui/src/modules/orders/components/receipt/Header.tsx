import React from 'react';
import dayjs from 'dayjs';
import { IOrder } from 'modules/orders/types';
import { ICustomer } from '../../types';
import { IUser } from 'modules/auth/types';

type Props = {
  ebarimt?: any;
  ebarimtError?: any;
  order: IOrder;
  logo: string;
  name: string;
}

export default class Header extends React.Component<Props> {
  renderField(text, data) {
    if (text && data) {
      return (
        <p>
          <label>{text}:</label> {data}
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
        <label>Харилцагч:</label>
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
        <label>Ажилтан: </label>
        <span>{worker.details ? worker.details.fullName : worker.email}</span>
      </p>);
  }

  render() {
    const { order, ebarimt, ebarimtError, logo, name } = this.props;

    return (
      <div>
        <div className="text-center receipt-logo">
          <img src={logo} alt={name} />
        </div>
        {ebarimtError ? <div>{ebarimtError}</div> : null}
        <div className="header">
          <h5 className="text-center">
            <b>{name}</b>
          </h5>
          <p>
            <label>&#8470;:</label>
            <span>{order.number}</span>
          </p>
          <div className="ebarimt">
            {this.renderField('ТТД', ebarimt && ebarimt.ttd)}
            {this.renderField('ДДТД', (ebarimt && ebarimt.billId) || order.billId)}
          </div>
          <p>
            <label>Огноо:</label>
            {order.paidDate ? (<span>
              {dayjs(order.paidDate)
                .format('YYYY.MM.DD HH:mm')}
            </span>) : null}
          </p>
          {this.renderWorker(order.user)}

          {this.renderCustomer(order.customer)}
          <div className="clearfix" />
        </div>
      </div>
    );
  } // end render()
}
