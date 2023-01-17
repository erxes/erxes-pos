import { useEffect, useState, useCallback, ReactNode } from 'react';
import { useApp } from 'modules/AppContext';

const KeyListener = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const [search, setSearchC] = useState('');
  const [changeDate, setChangeDate] = useState<number>(0);
  const { setSearch, changeIsBarcode } = useApp();

  const handleKeyDown = useCallback(
    ({ key }: { key: string }) => {
      const date = new Date().getTime();
      const difference = date - changeDate < 30;

      if (key.length === 1) {
        setSearchC((prev) => (difference ? prev + key : key.toString()));

        return setChangeDate(date);
      }
      if (key === 'Enter' && search && difference) {
        setSearch(search);
        changeIsBarcode(true);
        setSearchC('');
      }
    },
    [changeDate, changeIsBarcode, search, setSearch]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeDate, search, handleKeyDown]);

  return <div className={className}>{children}</div>;
};

export default KeyListener;
