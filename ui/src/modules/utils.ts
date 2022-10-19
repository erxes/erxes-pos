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
