import React from 'react';
import styled from 'styled-components';
import { IOrderItemInput } from '../types';

const Item = styled.div`
  border: 1px solid #ddd;
  display: flex;

  &:hover {
    cursor: pointer;
    background: #fff;
    color: #000;
  }
`;

type Props = {
  item: IOrderItemInput;
  changeItemCount: (item: IOrderItemInput) => void;
};

export default class StageItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  
  onChange(e) {
    const { item, changeItemCount } = this.props;
    const value = (e.target as HTMLInputElement).value;

    changeItemCount({ ...item, count: parseInt(value) })
  }

  render() {
    const { productName, unitPrice, count } = this.props.item;

    return (
      <Item>
        <p>{productName}</p>
        <span>{unitPrice}</span>
        <input type="number" min="0" defaultValue={count.toString()} onChange={this.onChange} />
      </Item>
    );
  }
}