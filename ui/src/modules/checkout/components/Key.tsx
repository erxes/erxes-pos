import Button from 'ui/Button';

const Key = ({ value }: { value: number | string }) => {
  return (
    <div className="col-3 key">
      <Button variant="slim">
        <h6>{value}</h6>
      </Button>
    </div>
  );
};

export default Key;
