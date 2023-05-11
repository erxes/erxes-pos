/* eslint-disable react-hooks/exhaustive-deps */
import { useConfigsContext } from 'modules/auth/containers/Configs';
import { useApp } from 'modules/AppContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'ui/Image';
import dayjs from 'dayjs';
import { IOrderItem } from '../types';
import { formatNum, goToReceipt } from 'modules/utils';
import { QRCodeSVG } from 'qrcode.react';
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
    putResponses,
    registerNumber,
    _id
  } = orderDetail;

  const number = (orderDetail.number || []).split('_')[1];

  const date = paidDate && dayjs(paidDate).format('YYYY.MM.DD HH:mm');

  useEffect(() => {
    window.addEventListener('afterprint', () => {
      if (
        mode !== 'kiosk' &&
        putResponses.length &&
        !['inner'].includes((type || '').toString())
      ) {
        setTimeout(() => {
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
          <th className="totalCount">Үнэ/Тоо</th>
          <th className="totalCount">Нийт дүн</th>
        </tr>
      </thead>
    );
  };

  const renderItem = (item: any, idx: number) => {
    const { unitPrice, totalAmount, name, qty } = item;
    return (
      <tr key={idx}>
        <td>{name}</td>
        <td className="totalCount">
          {formatNum(unitPrice)}₮ x{formatNum(qty)}
        </td>
        <td className="totalCount">
          {' '}
          = <b>{formatNum(totalAmount)}₮</b>
        </td>
      </tr>
    );
  };

  const renderError = (putResponse: any) => {
    if (!putResponse) return null;

    const { errorCode, lotteryWarningMsg, message } = putResponse;

    if (errorCode && message)
      return (
        <p>
          {errorCode}: {lotteryWarningMsg ? lotteryWarningMsg : message}
        </p>
      );
  };

  const renderQr = (putResponse: any) => {
    if (!putResponse || !!type) return null;

    const { qrData } = putResponse;

    return (
      qrData && (
        <div className="qr-code">
          <QRCodeSVG value={qrData} />
        </div>
      )
    );
  };

  const renderLotteryCode = (putResponse: any) => {
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

  const renderAmount = (putResponse: any) => {
    const Field = ({ text, val }: { text: string; val: number }) => {
      if (!val) return null;

      return (
        <div className="field">
          <b>{text}:</b>
          {formatNum(val, ',')}₮
        </div>
      );
    };

    return (
      <div className={cn('-sm', { block: !router.query.type })}>
        <Field text="НӨАТ" val={Number(putResponse.vat)} />
        <Field text="НХАТ" val={Number(putResponse.cityTax)} />
        <Field text="Дүн" val={Number(putResponse.amount)} />
      </div>
    )
  }

  const renderSignature = () => {
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
      {(putResponses || [] as any[]).map((putResponse: any, index: number) => (
        <div key={`taxtype-${putResponse.taxType}`} id={`taxtype-${putResponse.taxType}`}>
          {index > 0 && (<div className="receipt-splitter"></div>)}

          <div className="block">
            <table>
              {renderHeader()}
              <tbody>
                {(putResponse.stocks || []).map((item: IOrderItem, idx: number) =>
                  renderItem(item, idx)
                )}
              </tbody>
            </table>
          </div>
          <footer>
            {renderError(putResponse)}
            <div
              className={cn('lottery flex-h-between', {
                block: true,
              })}
            >
              {renderQr(putResponse)}
              <div>
                {renderAmount(putResponse)}
                {renderLotteryCode(putResponse)}
              </div>
            </div>
            {!type && <BarCode putResponse={putResponse} />}
          </footer>
        </div>
      ))}
      {<Amount />}
      {renderSignature()}
      <div className="text-center btn-print">
        <Button onClick={() => window.print()}>Хэвлэх</Button>
      </div>
    </div>
  );
};

export default Receipt;
