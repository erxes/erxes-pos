import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useApp } from 'modules/AppContext';
import Image from 'ui/Image';
import dayjs from 'dayjs';
import { IOrderItem } from '../types';
import { formatNum } from 'modules/utils';
import QRCode from 'react-qr-code';

const Receipt = () => {
  const { currentConfig } = useConfigsContext();
  const { uiOptions, name } = currentConfig;
  const { receiptIcon: logo } = uiOptions;

  const { orderDetail } = useApp();

  const { paidDate, worker, customer, items, putResponses } = orderDetail;
  const putResponse = putResponses[0];

  const number = (orderDetail.number || []).split('_')[1];

  const date = paidDate && dayjs(paidDate).format('YYYY.MM.DD HH:mm');

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
        <b>Харилцагч:</b>
        {code && <span>Код: {code}</span>}
        <span>Нэр: {firstName}</span>
      </p>
    );
  };

  const renderItem = (item: IOrderItem, idx: number) => {
    const { unitPrice, count, productName } = item;
    const total = unitPrice * (count || 0);
    return (
      <tr key={idx}>
        <td>{productName}</td>
        <td>
          {formatNum(unitPrice)}₮ x{count}
        </td>
        <td className="totalCount">
          {' '}
          = <b>{formatNum(total)}₮</b>
        </td>
      </tr>
    );
  };

  const renderError = () => {
    if (!putResponse) return null;

    const { errorCode, lotteryWarningMsg, message } = putResponse;

    if (errorCode && message)
      return (
        <p>
          {errorCode}: {lotteryWarningMsg ? lotteryWarningMsg : message}
        </p>
      );
  };

  const renderQr = () => {
    if (!putResponse) return null;

    const { qrData } = putResponse;

    return qrData && <QRCode value={qrData} />;
  };

  return (
    <div className="printDocument">
      <header className="block">
        <div className="flex-v-center">
          <Image src={logo} fill={false} height={32} width={32} alt={name} />
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
          <thead>
            <tr className="detail-row">
              <th>Бараа</th>
              <th>Үнэ/Тоо</th>
              <th className="totalCount">Нийт дүн</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: IOrderItem, idx: number) =>
              renderItem(item, idx)
            )}
          </tbody>
        </table>
      </div>
      <footer>
        {renderError()}
        <div className="lottery flex-v-center block">{renderQr()}</div>
      </footer>
    </div>
  );
};

export default Receipt;
