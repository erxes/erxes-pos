import type { IEbarimtConfig } from './types';

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
