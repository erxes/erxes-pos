import type { IEbarimtConfig } from './types';
import { ORDER_TYPES } from 'modules/constants';

// get env config from process.env or window.env
export const getEnv = (): any => {
  const envs: any = {};

  if (typeof window !== 'undefined') {
    for (const envMap of (window as any).envMaps) {
      envs[envMap.name] = localStorage.getItem(`pos_env_${envMap.name}`);
    }
  }

  return envs;
};

export const formatNum = (num: number | string, splitter?: any): string => {
  const checked = typeof num === 'string' ? Number(num) : num;

  return checked
    ? checked
        .toLocaleString(
          undefined,
          splitter && {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )
        .replaceAll(',', splitter ? splitter : ' ')
    : '0';
};

export const parseNum = (val: string | number) => {
  const str = val.toString();
  return str.length > 0 ? parseFloat(str.replaceAll(' ', '')) : 0;
};

export const getMode = (): string => {
  const mode =
    typeof window !== 'undefined' ? localStorage.getItem('mode') : 'pos';
  if (!mode) {
    localStorage.setItem('mode', 'pos');
    return 'pos';
  }
  return mode;
};

export const trimGraphqlError = (msg: string) => {
  return msg.replace('GraphQL error: ', '');
};

export const calcTaxAmount = (amount: number, config?: IEbarimtConfig) => {
  let taxPercent = 0;

  if (!config)
    return {
      vatAmount: 0,
      cityTaxAmount: 0,
      pureAmount: amount,
    };

  const hasVat = config.hasVat && config.vatPercent;
  const hasCityTax = config.hasCitytax && config.cityTaxPercent;

  if (hasVat) {
    taxPercent += config.vatPercent;
  }
  if (hasCityTax) {
    taxPercent += config.cityTaxPercent;
  }

  return {
    vatAmount: hasVat ? (amount / (100 + taxPercent)) * config.vatPercent : 0,
    cityTaxAmount: hasCityTax
      ? (amount / (100 + taxPercent)) * config.cityTaxPercent
      : 0,
    pureAmount: (amount / (100 + taxPercent)) * 100,
  };
};

export const goToReceipt = (
  _id: string,
  type: string = '',
  blank: string = '_black'
) => window.open(`/order-receipt/${_id}?type=${type}`, '_blank');

export const renderType = (type: string) => {
  if (type === ORDER_TYPES.EAT) return 'Зааланд';
  if (type === ORDER_TYPES.TAKE) return 'Авч явахаар';
  if (type === ORDER_TYPES.DELIVERY) return 'Хүргэлт';
};

export const readFile = (url: string = '') => {
  const READ_FILE = '/read-file?key=';
  if (url.includes(READ_FILE)) {
    const apiUrl = url.split(READ_FILE)[0];
    return url.replace(apiUrl, getEnv().NEXT_PUBLIC_SERVER_API_DOMAIN);
  }
  return url;
};

export const objToBase64 = (obj: object) =>
  Buffer.from(JSON.stringify(obj)).toString('base64');

export const getLocal = (name: string) => {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem(name) || '');
    } catch (error) {
      console.error('error', error);
    }
  }
};

export const setLocal = (name: string, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

export const sumAmount = (amounts: { amount: number }[]) =>
  (amounts || []).reduce(
    (sum: number, i: any) => Number(sum) + Number(i.amount),
    0
  );

export const getSumsOfAmount = (paidAmounts: any, paymentTypes: any) => {
  const result: any = {};

  for (const amount of paidAmounts || []) {
    if (!Object.keys(result).includes(amount.type)) {
      result[amount.type] = {
        title:
          paymentTypes.find((i: any) => i.type === amount.type)?.title ||
          'Unknown',
        value: 0,
      };
    }
    result[amount.type].value += amount.amount;
  }

  return result;
};
