import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import { IOrderItemInput } from "../types";
import { FlexBetween, FlexCenter } from "modules/common/styles/main";
import Icon from "modules/common/components/Icon";
import Quantity from "./Quantity";
import { PortraitStage } from "./portrait/style";
import FormControl from 'modules/common/components/form/Control';
import { ORDER_TYPES } from '../../../constants';

const Item = styled.div`
  background: #fff;
  border: 1px solid #cbd2d9;
  border-radius: 8px;
  position: relative;
  margin-bottom: 10px;
  margin-right: 4px;
`;

const Close = styledTS<{ isPortrait?: boolean }>(styled(FlexCenter))`
  background: ${(props) => !props.isPortrait ? "#e4ebf1" : "#e4ebf1"};
  width: ${(props) => (props.isPortrait ? "50px" : "30px")};

  position: absolute;
  right: ${(props) => (props.isPortrait ? "0" : "0")};
  top: ${(props) => (props.isPortrait ? "0" : "0")};
  bottom: ${(props) => (props.isPortrait ? "0" : "0")};
  cursor: pointer;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: all ease 0.3s;
  font-size: ${(props) => props.isPortrait ? "34px" : "14px"};

  &:hover {
    i {
      font-size: ${(props) => props.isPortrait ? "36px" : "17px;"};
    }
  }

  .close-manager {
    height: 80%
  }

  input {
    width: ${(props) => props.isPortrait ? "36px" : "18px;"};
    height: ${(props) => props.isPortrait ? "124px" : "18px;"};
  }
`;

export const Text = styledTS<{ isPortrait?: boolean }>(styled.div)`
  padding: 10px;
  word-break: break-word;
  font-size: ${(props) => props.isPortrait && "26px"};

  > div {
    line-height: ${(props) => (props.isPortrait ? "25px" : "13px")};
  }

  > span {
    color: #616e7c;
    font-size: ${(props) => (props.isPortrait ? "22px" : "11px")};
  }
`;

type Props = {
  item: IOrderItemInput;
  color: string;
  orientation?: string;
  changeItemCount: (item: IOrderItemInput) => void;
  changeItemIsTake: (item: IOrderItemInput, value: boolean) => void;
  type: string;
};

type State = {
  isTake: boolean;
}

export default class StageItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    const { type, item } = this.props;
    this.state = {
      isTake: type === ORDER_TYPES.EAT ? item.isTake || false : true
    }
  }

  onChange(e) {
    const { item, changeItemCount } = this.props;

    changeItemCount({ ...item, count: parseInt(e) });
  }

  renderCheckbox() {
    const { type, item, changeItemIsTake } = this.props;

    if (type !== ORDER_TYPES.EAT) {
      return (<></>);
    }

    const onChange = (e) => {
      changeItemIsTake(item, e.target.checked);
    }

    return (
      <FormControl
        type="checkbox"
        name="itemIsTake"
        onChange={onChange}
        checked={item.isTake}
        onClick={(e) => {e.stopPropagation()}}
      />
    );
  }

  render() {
    const { item, changeItemCount, color, orientation } = this.props;
    const { productName, unitPrice, count } = item;
    const isPortrait = orientation === "portrait";

    const onRemoveItem = () => {
      changeItemCount({ ...item, count: 0 });
    };

    if (isPortrait) {
      return (
        <Item>
          <PortraitStage>
            <Text isPortrait={isPortrait}>
              <div>
                <b>{productName}</b>
              </div>
              <span>
                {Number((unitPrice || 0).toFixed(1)).toLocaleString()}₮
              </span>
            </Text>
            <FlexCenter>
              <Quantity
                step={1}
                max={1000}
                value={count || 0}
                onChange={this.onChange}
                color={color}
                isPortrait={isPortrait}
              />
            </FlexCenter>
            <Close onClick={onRemoveItem} isPortrait={isPortrait}>
            <div className="close-manager">
                <Icon icon="cancel-1" />
                {this.renderCheckbox()}
              </div>
            </Close>
          </PortraitStage>
        </Item>
      );
    }

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
              color={color}
            />
          </FlexCenter>
          <Close onClick={onRemoveItem}>
            <div className="close-manager">
              <Icon icon="cancel-1" />
              {this.renderCheckbox()}
            </div>
          </Close>
        </FlexBetween>
      </Item>
    );
  } // end render()
}
