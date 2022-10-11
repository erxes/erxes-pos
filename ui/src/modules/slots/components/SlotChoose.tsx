import Button from 'modules/common/ui/Button';
import CaretDown from 'modules/common/icons/CaretDown';

const SlotChoose = () => {
  return (
    <div className="slot-choose">
      <Button variant="slim">
        Slot
        <CaretDown />
      </Button>
    </div>
  );
};

export default SlotChoose;
