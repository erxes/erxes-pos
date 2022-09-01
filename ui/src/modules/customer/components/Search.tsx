import Button from 'modules/common/ui/Button';
import UserInCircle from 'modules/common/icons/UserInCircle';
import ArrowRight from 'modules/common/icons/ArrowRight';

const CustomerSearch = () => {
  return (
    <div className="customer-search -pos">
      <Button variant="slim">
        <span className="flex-v-center">
          <UserInCircle />
          Хэрэглэгч хайх
        </span>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default CustomerSearch;
