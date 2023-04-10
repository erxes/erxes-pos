export const getValueOfPayment = (detail: any) =>
  ((detail.paidSummary || [])[0] || {}).value || 0;

export const handlePaymentChange = (
  value: string,
  type: string,
  setDetails: any
) => {
  const num = Number(value);
  return setDetails((prev: any) =>
    handleMap(prev, type, {
      paidSummary: [
        {
          _id: Math.random(),
          amount: num,
          kind: '1',
          kindOfVal: 1,
          value: num,
        },
      ],
    })
  );
};

export const handleMap = (arr: any, type: string, value: any) =>
  arr.map((el: any) => {
    if (el.paymentType === type) {
      return {
        ...el,
        ...value,
      };
    }
    return el;
  });
