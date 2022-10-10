import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useApp } from 'modules/AppContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'ui/Image';
import dayjs from 'dayjs';
import { IOrderItem } from '../types';
import { formatNum, goToReceipt } from 'modules/utils';
import QRCode from 'react-qr-code';
import BarCode from './barcode';
import Button from 'ui/Button';
import Amount from '../components/Amount';
import { getMode } from 'modules/utils';
import cn from 'classnames';

const Receipt = () => {
  const router = useRouter();
  const { type } = router.query;
  const { currentConfig } = useConfigsContext();
  const { uiOptions, name, ebarimtConfig } = currentConfig;
  const { receiptIcon: logo } = uiOptions;
  const { footerText } = ebarimtConfig || {};
  const mode = getMode();
  const { orderDetail } = useApp();

  const {
    paidDate,
    worker,
    customer,
    items,
    putResponses,
    registerNumber,
    _id,
    type: orderType,
    deliveryInfo,
  } = orderDetail;
  const putResponse = putResponses[0];

  const number = (orderDetail.number || []).split('_')[1];

  const date = paidDate && dayjs(paidDate).format('YYYY.MM.DD HH:mm');

  useEffect(() => {
    window.addEventListener('afterprint', () => {
      if (mode !== 'kiosk' && putResponse) {
        setTimeout(() => {
          if (type === 'kitchen') {
            window.close();
            return;
          }
          const popup = goToReceipt(_id, 'inner', '__blank');
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
        <b>Харилцагч:</b> <br />
        {code && <span>Код: {code}</span>}
        <span>Нэр: {firstName}</span>
      </p>
    );
  };

  const renderHeader = () => {
    if (type === 'kitchen')
      return (
        <thead>
          <tr className="detail-row">
            <th>Бараа</th>
            <th>Тоо</th>
          </tr>
        </thead>
      );

    return (
      <thead>
        <tr className="detail-row">
          <th>Бараа</th>
          <th>Үнэ/Тоо</th>
          <th className="totalCount">Нийт дүн</th>
        </tr>
      </thead>
    );
  };

  const renderItem = (item: IOrderItem, idx: number) => {
    const { unitPrice, count, productName } = item;
    const total = unitPrice * (count || 0);

    if (type === 'kitchen')
      return (
        <tr key={idx}>
          <td>{productName}</td>
          <td>{count}</td>
        </tr>
      );

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
    if (!putResponse || !!type) return null;

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
    if (!putResponse || !!type) return null;

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

  const renderSignature = () => {
    if (type === 'kitchen')
      return orderType === 'delivery' ? (
        <p>
          <b>Хүргэлтийн мэдээлэл:</b> {(deliveryInfo || {}).description}
        </p>
      ) : null;

    return footerText ? (
      <div className="text-center signature">
        <label>{footerText}</label>
      </div>
    ) : (
      <p className="signature">
        <label>Гарын үсэг:</label>
        <span> _____________________</span>
      </p>
    );
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
        {renderError()}
        <div
          className={cn('lottery flex-h-between', {
            block: type !== 'kitchen',
          })}
        >
          {renderQr()}
          <div>
            {type !== 'kitchen' && <Amount />}
            {renderLotteryCode()}
          </div>
        </div>
        {!type && <BarCode putResponse={putResponse} />}
        {renderSignature()}
        <div className="text-center btn-print">
          <Button onClick={() => window.print()}>Хэвлэх</Button>
        </div>
      </footer>
    </div>
  );
};

export default Receipt;
