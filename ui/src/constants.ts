export const ORDER_TYPES = {
  TAKE: 'take',
  EAT: 'eat',
  DELIVERY: 'delivery',
  ALL: ['take', 'eat', 'delivery']
};

export const ORDER_STATUSES = {
  NEW: 'new',
  PAID: 'paid',
  DOING: 'doing',
  CONFIRM: 'confirm',
  DONE: 'done',
  ROAD: 'road',
  COMPLETE: 'complete',

  ALL: ['new', 'paid', 'doing', 'done', 'road', 'complete', 'confirm'],
  FULL: ['paid', 'done', 'complete']
};

export const ORDER_ITEM_STATUSES = {
  NEW: 'new',
  PAID: 'paid',
  DOING: 'doing',
  CONFIRM: 'confirm',
  DONE: 'done',
  ROAD: 'road',
  COMPLETE: 'complete',

  ALL: ['new', 'paid', 'doing', 'done', 'road', 'complete', 'confirm'],
  FULL: ['paid', 'done', 'complete']
};

export const POS_MODES = {
  POS: '',
  KIOSK: 'kiosk',
  KITCHEN: 'kitchen',
  WAITING: 'waiting',
  ALL: ['', 'kiosk', 'kitchen', 'waiting']
};

// НӨАТ-н баримтын төрөл
export const BILL_TYPES = {
  CITIZEN: "1", // иргэнд өгөх баримт
  ENTITY: "3", // байгууллагад өгөх баримт
  INNER: "9", // дотоод буюу түр баримт
};

export const PAYMENT_TYPES = {
  CARD: 'cardAmount',
  CASH: 'cashAmount',
  RECEIVABLE: 'receivableAmount',
  REGISTER: 'registerNumber'
};
