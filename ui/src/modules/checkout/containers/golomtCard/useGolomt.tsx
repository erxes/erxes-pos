import { useConfigsContext } from 'modules/auth/containers/Configs';
import { objToBase64, strToObj } from 'modules/utils';

export const GOLOMT_CARD = 'golomtCard';
const GOLOMT_DEFAULT_PATH = 'http://localhost:8500';

const initialData = {
  operationCode: '26',
  amount: '0',
  bandwidth: '115200',
  timeout: '540000',
  currencyCode: '496',
  cMode: '',
  cMode2: '',
  additionalData: '',
  cardEntryMode: '',
  fileData: '',
  requestID: '0',
};

const useGolomt = () => {
  const { paymentTypes } = useConfigsContext();
  const golomtInfo = paymentTypes.find((pt) => pt.type === GOLOMT_CARD);

  const { port, ...restConfig } = strToObj((golomtInfo || {}).config) || {};

  const path = port ? `http://localhost:${port}` : GOLOMT_DEFAULT_PATH;

  const endPoint = (data: object) =>
    `${path}/requestToPos/message?data=${objToBase64(data)}`;

  const sendData = { ...initialData, ...restConfig };

  return { golomtInfo, endPoint, sendData, GOLOMT_CARD };
};

export default useGolomt;
