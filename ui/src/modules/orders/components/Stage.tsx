import React from 'react';
import { IOrderItemInput } from '../types';
import StageItem from './StageItem';

type Props = {
  items: IOrderItemInput[];
  changeItemCount: (item: IOrderItemInput) => void;
}

export default class Stage extends React.Component<Props> {  
  render() {
    const { items, changeItemCount } = this.props;

    return (
      <div>
        {
          items.map(i =>
            <StageItem item={i} key={`${i.productId}-${Math.random()}`} changeItemCount={changeItemCount} />
          )
        }
      </div>
    );
  }
}
