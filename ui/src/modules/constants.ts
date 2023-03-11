export const ORDER_TYPES = {
  TAKE: 'take',
  EAT: 'eat',
  DELIVERY: 'delivery',
  ALL: ['take', 'eat', 'delivery'],
};

export const ORDER_STATUSES = {
  NEW: 'new',
  DOING: 'doing',
  REDOING: 'reDoing',
  DONE: 'done',
  COMPLETE: 'complete',

  ALL: ['new', 'doing', 'done', 'complete', 'reDoing'],
  DISABLED: ['done', 'complete'],
};

export const ORDER_ITEM_STATUSES = {
  NEW: 'new',
  CONFIRM: 'confirm',
  DONE: 'done',

  ALL: ['new', 'done', 'confirm'],
};

export const POS_MODES = {
  POS: '',
  KIOSK: 'kiosk',
  KITCHEN: 'kitchen',
  WAITING: 'waiting',
  ALL: ['', 'kiosk', 'kitchen', 'waiting'],
};

// НӨАТ-н баримтын төрөл
export const BILL_TYPES = {
  CITIZEN: '1', // иргэнд өгөх баримт
  ENTITY: '3', // байгууллагад өгөх баримт
  INNER: '9', // дотоод буюу түр баримт
};

export const PAYMENT_TYPES = {
  CARD: 'cardAmount',
  CASH: 'cashAmount',
  REGISTER: 'registerNumber',
};

export const GOLOMT_CARD = 'golomtCard';
export const KHANBANK_CARD = 'khaanCard';
export const TDB_CARD = 'TDBCard';
export const MOBILE= 'mobileAmount'

export const BANK_CARDS = [GOLOMT_CARD, KHANBANK_CARD, TDB_CARD]


export const NOT_FOUND = '$notFound';
