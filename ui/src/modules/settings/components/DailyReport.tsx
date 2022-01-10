import React, { useContext } from "react";
import Button from "modules/common/components/Button";
import { AppContext } from "appContext";
import { HeaderWrapper } from '../../orders/components/receipt/styles';
import { Amounts, GroupUser, ReceiptWrapperReport, MainGroup, GroupCategory, Products } from '../styles';
import { __ } from "modules/common/utils";

type Props = {
  dailyReport: any;
};

export default function DailyReportReceipt({ dailyReport }: Props) {
  const { currentConfig } = useContext(AppContext);

  const logo =
    currentConfig && currentConfig.uiOptions && currentConfig.uiOptions.receiptIcon;
  const name = currentConfig && currentConfig.name ? currentConfig.name : "";
  const color =
    currentConfig &&
    currentConfig.uiOptions &&
    currentConfig.uiOptions.colors.primary;

  const formatAmount = (amount) => {
    return (
      <span>{(amount || 0).toLocaleString()}</span>
    )
  }

  const renderProduct = (product) => {
    return (
      <Products>
        <p>{`${product.name}: `} {formatAmount(product.count)}</p>
      </Products>
    )
  }

  const renderCategory = (category) => {
    return (
      <>
        <GroupCategory>
          <p>{`Барааны бүлэг: `} {category.name}</p>
        </GroupCategory>
        {Object.keys(category.products).map(p => (renderProduct(category.products[p])))}
      </>
    )
  }

  const renderAmounts = (amounts) => {
    return (
      <Amounts>
        <p>{`Бэлнээр: `} {formatAmount(amounts.cashAmount)}</p>
        <p>{`Картаар: `} {formatAmount(amounts.cardAmount)}</p>
        <p>{`QPay: `} {formatAmount(amounts.mobileAmount)}</p>
        <p>{`Нийт: `} {formatAmount(amounts.totalAmount)}</p>
        <p>{`Б.тоо: `} {formatAmount(amounts.count)}</p>
      </Amounts>
    )
  }
  const renderUser = (item) => {
    return (
      <MainGroup>
        <GroupUser>
          <span>{`Хэрэглэгч: `}</span>
          <span>
            {item.user.email}
          </span>
        </GroupUser>
        {renderAmounts(item.ordersAmounts)}
        {Object.keys(item.items).map(i => (renderCategory(item.items[i])))}
      </MainGroup>
    );
  }

  return (
    <ReceiptWrapperReport className="printDocument">
      <HeaderWrapper >
        <div className="receipt-logo">
          <img src={logo} alt={name} width={'32px'} height={'32px'} />
          <h5><b>{name}</b></h5>
        </div>
      </HeaderWrapper>
      {Object.keys(dailyReport).map((userId) => renderUser(dailyReport[userId]))}
      <p className="signature">
        <label>{__("Signature")}:</label>
        <span>_____________________</span>
      </p>
      <div className="text-center btn-print">
        <Button onClick={() => window.print()} style={{ backgroundColor: color }}>
          {__("Print")}
        </Button>
      </div>
    </ReceiptWrapperReport>
  );
}
