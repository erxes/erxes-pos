/* eslint-disable react-hooks/exhaustive-deps */
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useApp } from 'modules/AppContext';
import { useEffect } from 'react';
import Image from 'ui/Image';
import dayjs from 'dayjs';
import { IOrderItem } from '../types';
import Button from 'ui/Button';

const Receipt = () => {
  const { currentConfig } = useConfigsContext();
  const { uiOptions, name } = currentConfig;
  const { receiptIcon: logo } = uiOptions;
  const { orderDetail } = useApp();

  const {
    paidDate,
    worker,
    customer,
    items,
    type: orderType,
    deliveryInfo,
  } = orderDetail;

  const number = (orderDetail.number || []).split('_')[1];

  const date = paidDate && dayjs(paidDate).format('YYYY.MM.DD HH:mm');

  useEffect(() => {
    window.addEventListener('afterprint', () => {
      setTimeout(() => {
        window.close();
      }, 50);
    });
    setTimeout(() => {
      window.print();
    }, 20);
    return () => window.removeEventListener('afterprint', () => { });
  }, []);

  const renderWorker = () => {
    if (!worker) return;

    return (
      <p className="worker">
        <b>Ажилтан: </b>
        <span>{worker.details ? worker.details.fullName : worker.email}</span>
      </p>
    );
  };

  const renderCustomer = () => {
    if (!customer) return null;

    const { code, firstName } = customer;

    return (
      <p className="customer">
        <b>Харилцагч:</b> <br />
        {code && <span>Код: {code}</span>}
        <span>Нэр: {firstName}</span>
      </p>
    );
  };

  const renderHeader = () => {
    return (
      <thead>
        <tr className="detail-row">
          <th>Бараа</th>
          <th>Тоо</th>
        </tr>
      </thead>
    );
  };

  const renderItem = (item: IOrderItem, idx: number) => {
    const { count, productName } = item;

    return (
      <tr key={idx}>
        <td>{productName}</td>
        <td>{count}</td>
      </tr>
    );
  };

  const renderSignature = () => {
    return orderType === 'delivery' ? (
      <p>
        <b>Хүргэлтийн мэдээлэл:</b> {(deliveryInfo || {}).description}
      </p>
    ) : null;
  };

  return (
    <div className="printDocument">
      <header className="block">
        <div className="flex-h-between">
          <Image
            src={logo || ''}
            fill={false}
            height={32}
            width={32}
            alt={name}
          />
          <div>{name}</div>
          <div>
            &#8470;{':'}
            {number}
          </div>
        </div>
        <p>
          <b>Огноо:</b> <span>{date}</span>
        </p>
        {renderWorker()}
        {renderCustomer()}
      </header>
      <div className="block">
        <table>
          {renderHeader()}
          <tbody>
            {items.map((item: IOrderItem, idx: number) =>
              renderItem(item, idx)
            )}
          </tbody>
        </table>
      </div>
      <footer>
        {renderSignature()}
        <div className="text-center btn-print">
          <Button onClick={() => window.print()}>Хэвлэх</Button>
        </div>
      </footer>
    </div>
  );
};

export default Receipt;
