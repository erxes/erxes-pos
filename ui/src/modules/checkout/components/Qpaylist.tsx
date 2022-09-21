import { useApp } from 'modules/AppContext';
import { formatNum } from 'modules/utils';
import Button from 'ui/Button';
import cn from 'classnames';

const Qpaylist = () => {
  const { orderDetail } = useApp();
  const { qpayInvoices } = orderDetail;

  const handleClick = () => {};

  return (
    <div className="qpay-list">
      <table>
        <thead>
          <tr>
            <th>Төлөв</th>
            <th>Дүн</th>
            <th>Төлсөн огноо</th>
            <th>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {qpayInvoices.map((invoice: any, idx: number) => (
            <tr key={idx}>
              <td>
                <span className={cn('status', invoice.status)}>
                  {invoice.status}
                </span>
              </td>
              <td>{formatNum(Number(invoice.amount))}₮</td>
              <td>{invoice.paidDate || '-'}</td>
              <td>
                <Button>Харах</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Qpaylist;
