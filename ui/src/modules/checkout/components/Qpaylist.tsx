import { useRouter } from 'next/router';
import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import { formatNum } from 'modules/utils';
import Button from 'ui/Button';
import Tag from 'ui/Tag';

const Qpaylist = () => {
  const router = useRouter();
  const { orderDetail } = useApp();
  const { setModalView, openModal } = useUI();
  const { qpayInvoices } = orderDetail;

  const handleClick = (_id: string) => {
    router.push(
      { pathname: router.pathname, query: { ...router.query, qpayId: _id } },
      undefined,
      { shallow: true }
    );
    setModalView('QPAY_VIEW');
  };

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
                <Tag status={invoice.status}>{invoice.status}</Tag>
              </td>
              <td>{formatNum(Number(invoice.amount))}₮</td>
              <td>{invoice.paidDate || '-'}</td>
              <td>
                <Button onClick={() => handleClick(invoice._id)}>Харах</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Qpaylist;
