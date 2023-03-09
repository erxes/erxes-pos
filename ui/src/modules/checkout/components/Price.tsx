/* eslint-disable react-hooks/exhaustive-deps */
import { memo } from 'react';
import { formatNum } from 'modules/utils';

function Products({ result, price, onClick }: any) {

  return (
    <button className="btn ghost" onClick={onClick}>
      {<abbr title={result}>{formatNum(price)}₮{' '}</abbr>}
    </button>
  );
}

export default memo(Products);
