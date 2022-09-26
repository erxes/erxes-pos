import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useApp } from 'modules/AppContext';
import { useEffect } from 'react';
import Image from 'ui/Image';
import dayjs from 'dayjs';
import { IOrderItem } from '../types';
import { formatNum } from 'modules/utils';
import QRCode from 'react-qr-code';
import BarCode from './barcode';
import Button from 'ui/Button';
import Amount from '../components/Amount';
import { getMode } from 'modules/utils';

const Receipt = () => {
  const { currentConfig } = useConfigsContext();
  const { uiOptions, name, ebarimtConfig } = currentConfig;
  const { receiptIcon: logo } = uiOptions;
  const { footerText } = ebarimtConfig || {};

  const { orderDetail } = useApp();

  const {
    paidDate,
    worker,
    customer,
    items,
    putResponses,
    registerNumber,
    _id,
  } = orderDetail;
  const putResponse = putResponses[0];

  const number = (orderDetail.number || []).split('_')[1];

  const date = paidDate && dayjs(paidDate).format('YYYY.MM.DD HH:mm');

  useEffect(() => {
    if (putResponse) {
      const mode = getMode();
      window.addEventListener('afterprint', () => {
        if (mode !== 'kiosk') {
          setTimeout(() => {
            const popup = window.open(
              `/order-receipt/${_id}?inner=true`,
              '__blank'
            );
            if (!popup) {
              prompt(
                `Popup зөвшөөрөгдөөгүй байна. Дараах тохиргоог хийнэ үү. \n 1. Доорх холбоосыг copy-дох  \n 2. шинэ tab нээж, paste хийн копидсон холбоосоор орох \n 3. "Pop-ups and redirects" гэсэн хэсгийг олоод \n 4. "Allow" гэснийг сонгоно. \n 5. Үндсэн хуудасаа рефреш`,
                `chrome://settings/content/siteDetails?site=${window.location.origin}`
              );
            }
          }, 10);
        }
        setTimeout(() => {
          window.close();
        }, 50);
      });
      setTimeout(() => {
        window.print();
      }, 20);
    }

    return () => window.removeEventListener('afterprint', () => {});
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

    return (
      qrData && (
        <div className="qr-code">
          <QRCode value={qrData} size={256} viewBox={`0 0 256 256`} level="L" />
        </div>
      )
    );
  };

  const renderLotteryCode = () => {
    if (!putResponse) return null;

    if (putResponse.billType === '3') {
      const { customerName = '' } = putResponse;

      return (
        <div className="lottery">
          <span>Компанийн РД:</span>
          <br />
          <b>{registerNumber}</b>
          {customerName && (
            <p>
              Hэр: <b>{customerName}</b>
            </p>
          )}
        </div>
      );
    }

    return putResponse.lottery ? (
      <div className="text-center">
        Сугалаа:
        <br />
        <b>{putResponse.lottery}</b>
      </div>
    ) : null;
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
        <div className="lottery flex-v-center block">
          {renderQr()}
          <div>
            <Amount />
            {renderLotteryCode()}
          </div>
        </div>
        <BarCode putResponse={putResponse} />
        {footerText ? (
          <div className="text-center signature">
            <label>{footerText}</label>
          </div>
        ) : (
          <p className="signature">
            <label>Гарын үсэг:</label>
            <span> _____________________</span>
          </p>
        )}

        <div className="text-center btn-print">
          <Button onClick={() => window.print()}>Хэвлэх</Button>
        </div>
      </footer>
    </div>
  );
};

export default Receipt;
