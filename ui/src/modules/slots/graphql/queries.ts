import { queryParamsDefs, queryParamsValues } from "modules/checkout/graphql/queries";

const fullOrders = `
  query fullOrders(${queryParamsDefs}) {
    fullOrders(${queryParamsValues}) {
      _id
      number
      status
      paidDate
      origin
      slotCode
    }
  }`;

const queries = { fullOrders };
export default queries;
