import Input from 'ui/Input';

const PaymentInput = ({ children }: any) => {
  return (
    <div className="flex-v-center payment-input">
      <div>
        <div className="flex-v-center">
          ₮ <Input value="5000" />
        </div>

        <caption>Үлдэгдэл: 40 000</caption>
      </div>

      {children}
    </div>
  );
};

export default PaymentInput;
