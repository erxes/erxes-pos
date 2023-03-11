import { useConfigsContext } from 'modules/auth/containers/Configs';
import { strToObj } from 'modules/utils';
import { TDB_CARD } from 'modules/constants';

export const objToString = (details: any) => {
  const formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};

export const TDB_DEFAULT_PATH = 'http://localhost:8088';

const useTDB = () => {
  const method = 'POST';
  const { paymentTypes } = useConfigsContext();
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  };
  const tdbCardInfo = (paymentTypes || []).find((pt) => pt.type === TDB_CARD);
  const port = (strToObj(tdbCardInfo?.config) || {}).port;
  const path = port ? `http://localhost:${port}` : TDB_DEFAULT_PATH;

  const endPoint = `${path}/ecrt1000`;
  return {
    objToString,
    method,
    headers,
    endPoint,
    tdbCardInfo,
    TDB_CARD,
  };
};

export default useTDB;
