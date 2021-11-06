import React from "react";
import styled from "styled-components";
import { IOrderItemInput } from "../types";
import { FlexBetween, FlexCenter } from "modules/common/styles/main";
import { confirm } from "modules/common/utils";
import Icon from "modules/common/components/Icon";
import Quantity from "./Quantity";

const Item = styled.div`
  background: #fff;
  border: 1px solid #cbd2d9;
  border-radius: 8px;
  position: relative;
  margin-bottom: 10px;
`;

const Close = styled(FlexCenter)`
  background: #e4ebf1;
  width: 35px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: all ease 0.3s;

  &:hover {
    i {
      font-size: 14px;
    }
  }
`;

export const Text = styled.div`
  padding: 10px;

  > div {
    line-height: 13px;
  }

  > span {
    color: #616e7c;
    font-size: 11px;
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

    changeItemCount({ ...item, count: parseInt(e) });
  }

  render() {
    const { item, changeItemCount } = this.props;
    const { productName, unitPrice, count } = item;

    const onRemoveItem = () => {
      confirm("Are you sure").then(() => {
        changeItemCount({ ...item, count: 0 })
      });
    };

    return (
      <Item>
        <FlexBetween>
          <Text>
            <div>
              <b>{productName}</b>
            </div>
            <span>{Number((unitPrice || 0).toFixed(1)).toLocaleString()}₮</span>
          </Text>
          <FlexCenter>
            <Quantity
              step={1}
              max={1000}
              value={count || 0}
              onChange={this.onChange}
            />
            <Close onClick={onRemoveItem}>
              <Icon icon="cancel-1" />
            </Close>
          </FlexCenter>
        </FlexBetween>
      </Item>
    );
  }
}
