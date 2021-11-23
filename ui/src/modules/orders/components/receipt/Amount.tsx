import { IOrder } from "modules/orders/types";
import React from "react";

import LocaleField from "./LocaleField";
import { AmountContainer } from "./styles";

type Props = {
  order: IOrder;
};

export default class Amount extends React.Component<Props> {
  render() {
    const { order } = this.props;

    return (
      <AmountContainer className="block">
        <div className="order-amounts">
          {/* <LocaleField text="Tax" data={this.props.taxAmount} /> */}
          <div>
            <div className="sep" />
            <LocaleField text="Дүн" data={order.totalAmount} />
            <div className="sep" />
            {/* <LocaleField
                text="Цэвэр дүн"
                data={totalAmount * 100 / (100 + percent)}
              /> */}
            {/* <LocaleField
                text={`Service Charge (${
                  this.context.company.configGeneral.serviceChargePercent
                }%)`}
                data={amount.serviceChargeAmount}
              /> */}
            {/* <LocaleField text="НӨАТ (10%)" data={amount.vatAmount} /> */}
            {/* <LocaleField text="НХАТ (1%)" data={amount.cityTaxAmount} /> */}
            <LocaleField text="Нийт дүн" data={order.finalAmount} />
          </div>
          <div className="sep" />
          {/* <p>
            <label>ТАНЫ ТӨЛӨХ ДҮН:</label>
            <strong>
              {' '}
              <span className="totalCount">
                {toPay.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                ₮
              </span>
            </strong>
          </p> */}
          {order.status === "paid" ? <div className="sep" /> : null}
          <LocaleField text="Бэлнээр" data={order.cashAmount} />
          <LocaleField text="Картаар" data={order.cardAmount} />
          <LocaleField text="Мобайл" data={order.mobileAmount} />
        </div>
      </AmountContainer>
    );
  } // end render()
}
