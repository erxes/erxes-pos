import { orderFields, orderItemsFields } from './queries';

const addEditParamDefs = `$items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String, $slotCode: String`;
const addEditParams = `items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId, slotCode: $slotCode`;

const ordersAdd = `
  mutation ordersAdd(${addEditParamDefs}, $origin: String) {
    ordersAdd(${addEditParams}, origin: $origin) {
      ${orderFields}
      ${orderItemsFields}
    }
  }
`;

const ordersEdit = `
  mutation ordersEdit($_id: String!, ${addEditParamDefs}) {
    ordersEdit(_id: $_id, ${addEditParams}) {
      ${orderFields}
      ${orderItemsFields}
    }
  }
`;

const mutations = {
  ordersAdd,
  ordersEdit,
};

export default mutations;
