import { IQPayConfig } from "../../db/models/definitions/configs";
import { sendRequest } from "./commonUtils";

export const fetchQPayToken = async (qpayConfig: IQPayConfig) => {
  const response = await sendRequest({
    url: `${qpayConfig.url}/v2/auth/token`,
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${qpayConfig.username}:${qpayConfig.password}`).toString('base64')}`
    }
  });

  return response;
};

export const requestQPayInvoice = async (data: any, accessToken: string, qpayConfig: IQPayConfig) => {
  const response = await sendRequest({
    method: 'POST',
    url: `${qpayConfig.url}/v2/invoice`,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: { ...data }
  });

  return response;
};

export const fetchQPayInvoice = async (invoiceId: string, accessToken: string, config: IQPayConfig) => {
  const response = await sendRequest({
    method: 'GET',
    url: `${config.url}/v2/invoice/${invoiceId}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  return response;
};
