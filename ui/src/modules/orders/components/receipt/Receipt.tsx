import React, { useContext } from 'react';
import { IOrder } from '../../types';
import { ReceiptWrapper } from '../../styles';
import { AppContext } from 'appContext';
import Header from './Header';
import Body from './Body';
import Amount from './Amount';
import Footer from './Footer';

type Props = {
  order: IOrder;
};

export default function OrderReceipt({ order }: Props) {
  const { currentConfig } = useContext(AppContext);
  const logo = currentConfig && currentConfig.uiOptions && currentConfig.uiOptions.logo;
  const name = currentConfig && currentConfig.name ? currentConfig.name : '';

  return (
    <ReceiptWrapper>
      <Header order={order} logo={logo} name={name} />
      <Body items={order.items} />
      <Amount order={order} />
      <Footer ebarimt={{}} print={() => {}} />
    </ReceiptWrapper>
  );
}