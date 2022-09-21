import { useRouter } from 'next/router';
import { useCheckoutContext } from 'modules/checkout/context';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useApp } from 'modules/AppContext';
import useAlert from 'ui/Alert';
import Visa from 'modules/common/icons/Visa';

const Card = ({ addPayment }: any) => {
  const router = useRouter();
  const { orderId } = router.query;
  const { orderDetail } = useApp();
  const { number } = orderDetail;
  const { onAlert, Alert } = useAlert('span');

  const { card } = useCheckoutContext();

  const PATH = 'http://localhost:27028';

  const sendTransaction = async () => {
    fetch(`${PATH}/ajax/get-status-info`)
      .then((res) => res.json())
      .then((res: any) => {
        if (res && res.status_code === 'ok') {
          // send transaction upon successful connection
          fetch(PATH, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              service_name: 'doSaleTransaction',
              service_params: {
                // special character _ is not accepted
                db_ref_no: number.replace('_', ''),
                amount: card,
                vatps_bill_type: '1',
              },
            }),
          })
            .then((res) => res.json())
            .then((r) => {
              if (r && r.status === true && r.response) {
                if (r.response.response_code === '000') {
                  onAlert('Transaction was successful');

                  addPayment({
                    _id: orderId,
                    cardInfo: r.response,
                    cardAmount: card,
                  });
                } else {
                  onAlert(r.response.response_msg);
                }
              }

              if (!r.status && r.response) {
                const { Exception = { ErrorMessage: '' } } = r.response;

                onAlert(`${Exception.ErrorMessage}`);
              }
            })
            .catch((e) => {
              onAlert(e.message);
            });
        }
      })
      .catch((e) => {
        onAlert(`${e.message}: Databank-н төлбөрийн програмтай холбогдсонгүй`);
      });
  };

  return (
    <PaymentMethod name="card" onClick={() => null} btnText="Гүйлгээ хийх">
      <Visa />
    </PaymentMethod>
  );
};

export default Card;
