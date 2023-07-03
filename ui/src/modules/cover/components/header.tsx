import Link from 'next/link';
import Plus from 'icons/Plus';
import Ink from 'react-ink';

const Header = () => {
  return (
    <div className="flex-h-between">
      <h6>Хаалтууд</h6>
      <Link href="/cover/create" className="btn flat cover-create">
        <a>
          <Plus />
          Нэмэх
          <Ink />
        </a>
      </Link>
    </div>
  );
};

export default Header;
