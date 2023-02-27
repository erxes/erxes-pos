/* eslint-disable react-hooks/exhaustive-deps */
import Golomt from 'icons/Golomt';
import PaymentMethod from 'modules/checkout/components/PaymentMethod';
import { useEffect, useState } from 'react';
import { useUI } from 'ui/context';
import useGolomt from './useGolomt';

export const GOLOMT_CARD = 'golomtCard';

const GolomtCard = () => {
  const { setModalView, openModal } = useUI();
  const [loading, setLoading] = useState(true);
  const { golomtInfo, endPoint, sendData } = useGolomt();

  useEffect(() => {
    if (golomtInfo) {
      fetch(endPoint(sendData))
        .then((res) => res.json())
        .then((res: any) => {
          if (res?.responseCode === '00') {
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
