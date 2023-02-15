import { useConfigsContext } from 'modules/auth/containers/Configs';
import { formatNum } from 'modules/utils';
import Image from 'ui/Image';
import dayjs from 'dayjs';
import Button from 'ui/Button';

const Receipt = ({ date, report }: any) => {
  const { currentConfig, paymentTypes } = useConfigsContext();
  const { receiptIcon: logo, name, ebarimtConfig } = currentConfig;
  const { footerText } = ebarimtConfig || {};

  if (!report) return null;

  const excludeTypes = ['_id', 'cashAmount', 'cardAmount', 'mobileAmount', 'count', 'totalAmount', 'receivableAmount'];

  const renderAmounts = (amounts: any) => {
    return (
      <div className="amounts">
        <p className="flex-h-between">
          {`Бэлнээр: `}
          <span>{formatNum(amounts.cashAmount, ',')}₮</span>
        </p>
        <p className="flex-h-between">
          {`Цахимаар: `} <span>{formatNum(amounts.mobileAmount, ',')}₮</span>
        </p>
        {
          amounts.cardAmount && (
            <p className="flex-h-between">
              {`Картаар: `} <span>{formatNum(amounts.cardAmount, ',')}₮</span>
            </p>
          ) || ''
        }
        {
          amounts.receivableAmount && (
            <p className="flex-h-between">
              {`Картаар: `} <span>{formatNum(amounts.receivableAmount, ',')}₮</span>
            </p>
          ) || ''
        }

        {
          (Object.keys(amounts) || [])
            .filter(key => !excludeTypes.includes(key))
            .map(type => (
              <p className="flex-h-between" key={type}>
                {`${((paymentTypes || []).find(t => t.type === type) || { title: type }).title}: `}
                <span>{formatNum(amounts[type], ',')}₮</span>
              </p>
            ))
        }

        <p className="flex-h-between">
          {`Нийт: `} <span>{formatNum(amounts.totalAmount, ',')}₮</span>
        </p>
        <p className="flex-h-between">
          {`Б.тоо: `} <span>{formatNum(amounts.count)}</span>
        </p>
      </div>
    );
  };

  const renderProduct = (product: any) => {
    return (
      <p className="printDocument-product flex-h-between" key={Math.random()}>
        {`${product.name}: `} <span>{formatNum(product.count)}</span>
      </p>
    );
  };

  const renderCategory = (category: any) => {
    return (
      <>
        <div key={Math.random()} className="category">
          <b>
            {`Барааны бүлэг: `} {category.name}
          </b>
        </div>
        {Object.keys(category.products).map((p) =>
          renderProduct(category.products[p])
        )}
      </>
    );
  };

  const renderUser = (item: any) => {
    return (
      <div key={Math.random()} className="printDocument-user block">
        <b className="flex-v-center">
          <span>{`Хэрэглэгч: `}</span>
          <span>{item.user.email}</span>
        </b>
        {renderAmounts(item.ordersAmounts)}
        {Object.keys(item.items).map((i) => renderCategory(item.items[i]))}
      </div>
    );
  };

  return (
    <div className="printDocument">
      <header className="block">
        <div className="flex-v-center">
          <Image src={logo} fill={false} height={32} width={32} alt={name} />
          <div>{name}</div>
        </div>
        <p>
          Хамаарах: <b>{date}</b>
        </p>
        <p>Хэвлэсэн: {dayjs().format('YYYY-MM-DD HH:mm')}</p>
      </header>
      {Object.keys(report || {}).map((userId) => renderUser(report[userId]))}
      <footer>
        <p className="signature">
          <label>Гарын үсэг:</label>
          <span> _____________________</span>
        </p>
        <p className="signature">{footerText}</p>
        <div className="btn-print">
          <Button onClick={() => window.print()}>Хэвлэх</Button>
        </div>
      </footer>
    </div>
  );
};

export default Receipt;
