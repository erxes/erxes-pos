import Button from 'modules/common/ui/Button';
import { useTimer } from 'react-timer-hook';

const AskCancel = ({
  goBackToHome,
  setIsModalVisible,
  expiryTimestamp,
}: any) => {
  const { seconds } = useTimer({
    expiryTimestamp,
    onExpire: goBackToHome,
  });
  return (
    <div className="kiosk-cancel modal-kiosk">
      <h4>Ta захиалгаа үргэлжлүүлэх үү?</h4>
      <big>
        таны захиалага <h5>{seconds}</h5> секундын дараа цуцлагдана.
      </big>
      <div className="row">
        <div className="col-6">
          <Button variant="slim" onClick={goBackToHome}>
            <h5>Шинээр эхлэх</h5>
          </Button>
        </div>
        <div className="col-6">
          <Button onClick={() => setIsModalVisible(false)}>
            <h5>Үргэлжлүүлэх</h5>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AskCancel;
