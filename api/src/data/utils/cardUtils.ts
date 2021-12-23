import { sendRequest } from "./commonUtils";

interface IParams {
  orderNumber: string;
  amount: number;
  billType: string;
}

export const checkConnection = async () => {
  const resp = await sendRequest({
    url: 'http://localhost:27028/ajax/get-status-info',
    method: 'GET'
  });

  if (resp && resp.status_code === 'ok') {
    return true;
  }

  return false;
};

export const sendTransaction = async ({ orderNumber, amount, billType }: IParams) => {
  const response = await sendRequest({
    body: {
      service_name: 'doSaleTransaction',
      service_params: {
        db_ref_no: orderNumber,
        amount,
        vatps_bill_type: billType,
      }
    }
  });

  return response;
};

/**
 * Э-баримт хэвлэгдсний дараа банк руу амжилттай болсон хүсэлт явуулна.
 * @param {string} ddtd Захиалгын ДДТД
 * @param {string} bankTraceNumber Банкнаас буцаасан код
 */
 export const sendBankConfirmSale = async(ddtd: string, orderNumber: string, bankTraceNumber: string) => {
  const response = await sendRequest({
    url: 'http://localhost:27028/',
    method: 'POST',
    body: {
      service_name: 'confirmSaleCompleted',
      service_params: {
        ddtd,
        db_ref_no: orderNumber,
        trace_no: bankTraceNumber,
        // is_vatps: '0'
      }
    }
  });
  
  return response;
};

export const voidTransaction = async (orderNumber: string) => {
  const response = await sendRequest({
    body: {
      service_name: 'voidTransaction',
      service_params: {
        db_ref_no: orderNumber,
        trace_no: ''
      }
    }
  });

  return response;
};

// Хүсэлтийн хариунд ирэх алдааны утгууд
export const ERROR_MESSAGES = {
  E001: 'Холболт баталгаажуулах шаардлагатай',
  E002: 'Портын дугаар тохируулах шаардлагатай',
  E003: 'Төхөөрөмжтэй холбогдоход алдаа гарлаа. Төхөөрөмжийн холболтыг шалгана уу',
  E004: 'Тохиргоотой холбоотой алдаа гарлаа',
  E005: 'Сервертэй холбогдоход алдаа гарлаа',
  E006: 'Өгөгдөл формат протоколын дагуу биш байна',
  E007: 'Параметр дутуу',
  E008: 'Холболт баталгаажуулах үйлдлийг дахин хийх боломжгүй',
  E009: 'Тохиргоо олдсонгүй',
  E010: 'Өгөгдлийн бүтэц таарахгүй байна (LRC)',
  E011: 'Хувьсагчийн урт хэтэрсэн. Хувьсагчийн уртыг шалгана уу',
  E012: 'Хувьсагчийн төрөл зөрүүтэй. Хувьсагчийн төрлийг шалгана уу',
  E013: 'Хувьсагчийн утга тусгай тэмдэгт агуулсан',
  E014: 'Хувьсагчийн утга сөрөг (-) байна',
  E027: 'Өмнө амжилттай болсон гүйлгээний хүсэлтийг дахин явуулсан байна'
};
