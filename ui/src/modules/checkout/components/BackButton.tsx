import ArrowLeft from 'icons/ArrowLeft';
import Button from 'ui/Button';
const BackButton = ({ ...props }) => {
  return (
    <Button variant="ghost" className="back-btn" riffle={false} {...props}>
      <h6>
        <ArrowLeft />
        Буцах
      </h6>
    </Button>
  );
};

export default BackButton;
