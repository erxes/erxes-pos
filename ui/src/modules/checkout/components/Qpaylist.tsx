import { useApp } from 'modules/AppContext';
import { useUI } from 'ui/context';
import { formatNum } from 'modules/utils';
import Button from 'ui/Button';
import Tag from 'ui/Tag';
import { useAddQuery } from 'lib/useQuery';

const Qpaylist = () => {
  const { orderDetail } = useApp();
  const { setModalView } = useUI();
  const { qpayInvoices } = orderDetail;
  const { addQuery } = useAddQuery();

  const handleClick = (_id: string) => {
    addQuery({ qpayId: _id });
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
