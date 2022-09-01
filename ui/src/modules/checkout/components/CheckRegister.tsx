import Radio from 'modules/common/ui/Radio';
import Input from 'modules/common/ui/Input';

const CheckRegister = () => {
  return (
    <>
      <div className="register flex-v-center">
        <div className="flex-center">
          <Radio />
          <div>
            <caption>
              <b>Байгууллагын РД</b>
            </caption>
            <div className="flex-v-center">
              <Input type="number" required step="1" placeholder="0000000" />
              <div className="name">Эрхэс Инк</div>
            </div>
          </div>
        </div>
        <caption className="error">Байгууллагын регистер буруу байна.</caption>
      </div>
    </>
  );
};

export default CheckRegister;
