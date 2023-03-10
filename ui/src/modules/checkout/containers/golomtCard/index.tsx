/* eslint-disable react-hooks/exhaustive-deps */
import Golomt from 'icons/Golomt';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useEffect, useState } from 'react';
import { useUI } from 'ui/context';
import useGolomt from './useGolomt';

const GolomtCard = () => {
  const { setModalView, openModal } = useUI();
  const [loading, setLoading] = useState(true);

  const { golomtInfo, endPoint, sendData, GOLOMT_CARD } = useGolomt();

  useEffect(() => {
    if (golomtInfo) {
      fetch(endPoint(sendData))
        .then((res: any) => res.json())
        .then((r: any) => {
          const posResult = JSON.parse(r?.PosResult);
          if (posResult?.responseCode === '00') {
            setLoading(false);
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, []);

  if (loading) return null;

  return (
    <PaymentMethod
      name={GOLOMT_CARD}
      onClick={() => {
        setModalView('GOLOMT_VIEW');
        openModal();
      }}
      btnText="Гүйлгээ хийх"
    >
      <Golomt className="-golomtCard" />
    </PaymentMethod>
  );
};

export default GolomtCard;
