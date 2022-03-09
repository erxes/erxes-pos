import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { IOrderItemInput } from '../types';
import { FlexBetween, FlexCenter } from 'modules/common/styles/main';
import Icon from 'modules/common/components/Icon';
import Quantity from './Quantity';
import { SelectedItem, SelectedStage } from './kiosk/style';
import FormControl from 'modules/common/components/form/Control';
import { ORDER_TYPES } from '../../../constants';
import Tip from 'modules/common/components/Tip';
import { PackageProduct } from '../styles';
import { __ } from 'erxes-ui/lib/utils/core';

const Item = styled.div`
  background: #fff;
  border: 1px solid #ff7800;
  border-radius: 8px;
  position: relative;
  margin-bottom: 10px;
  margin-right: 4px;
`;

const Close = styledTS<{ isPortrait?: boolean }>(styled(FlexCenter))`
  background: ${props =>
    props.isPortrait ? '#e4ebf1' : 'rgba(255, 120, 0, 0.12)'};
  width: ${props => (props.isPortrait ? '0' : '30px')};
  position: ${props => (props.isPortrait ? '' : 'absolute')}; ;
  right: ${props => (props.isPortrait ? '0' : '0')};
  top: ${props => (props.isPortrait ? '0' : '0')};
  bottom: ${props => (props.isPortrait ? '0' : '0')};
  cursor: pointer;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: all ease 0.3s;
  font-size: ${props => (props.isPortrait ? '10px' : '14px')};
  justify-content: center;

  &:hover {
    i {
      font-size: ${props => (props.isPortrait ? '' : '17px;')};
    }
  }

  input {
    width: ${props => (props.isPortrait ? '36px' : '18px;')};
    height: ${props => (props.isPortrait ? '124px' : '18px;')};
  }
`;

export const Text = styledTS<{ isPortrait?: boolean }>(styled.div)`
  padding: ${props => (props.isPortrait ? '' : '5px')};
  font-size: ${props => props.isPortrait && '12px'};
  margin-top: ${props => props.isPortrait && ''};
  color: ${props => (props.isPortrait ? '' : '#904300')};
  display: ${props => (props.isPortrait ? '' : 'flex')};
  align-items: center;

  > div {
    line-height: ${props => (props.isPortrait ? '20px' : '15px')};
    font-size: ${props => (props.isPortrait ? '16px' : '12px')};  
    margin-left: 5px;
    display: grid;

    > span {
      margin-top: 5px;
      font-size: ${props => (props.isPortrait ? '16px' : '11px')};  
    }
  }

  input {
    width:20px;
    height: 20px;
    border-radius: 30px;
  }
`;

export const COUNT_TYPES = {
  MINUS: 'minus',
  PLUS: 'plus'
};

type Props = {
  item: IOrderItemInput;
  color: string;
  orientation?: string;
  changeItemCount: (item: IOrderItemInput) => void;
  changeItemIsTake: (item: IOrderItemInput, value: boolean) => void;
  type: string;
  mode: string;
};

type State = {
  isTake: boolean;
  countType: string;
};

export default class StageItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    const { type, item } = this.props;

    this.state = {
      isTake: type === ORDER_TYPES.EAT ? item.isTake || false : true,
      countType: ''
    };
  }

  onChange(e) {
    const { item, changeItemCount } = this.props;

    changeItemCount({ ...item, count: parseInt(e) });
  }

  renderCheckbox() {
    const { item, changeItemIsTake, mode, type } = this.props;

    if (mode === 'kiosk' || type !== ORDER_TYPES.EAT) {
      return <></>;
    }

    const onChange = e => {
      changeItemIsTake(item, e.target.checked);
    };

    return (
      <Tip text={'Тусгайлан авч явах бол тэмдэглэх'} placement="right">
        <label>
          <FormControl
            type="checkbox"
            name="itemIsTake"
            onChange={onChange}
            checked={item.isTake}
            onClick={e => {
              e.stopPropagation();
            }}
          />
        </label>
      </Tip>
    );
  }

  renderName() {
    const { item } = this.props;

    if (item.isPackage) {
      return <PackageProduct>{item.productName}</PackageProduct>;
    }

    return item.productName;
  }

  render() {
    const { item, changeItemCount, color, mode } = this.props;
    const { unitPrice, count, productImgUrl, productName } = item;
    const { countType } = this.state;

    const onRemoveItem = () => {
      changeItemCount({ ...item, count: 0 });
    };

    const onIncCount = value => {
      const count = item.count + 1;

      this.setState({ countType: value });
      changeItemCount({ ...item, count });
    };

    const onDecCount = value => {
      const count = item.count - 1;

      this.setState({ countType: value });
      changeItemCount({ ...item, count });
    };

    if (mode === 'kiosk') {
      return (
        <SelectedItem>
          <SelectedStage>
            <Icon onClick={onRemoveItem} icon="cancel-1" color={color} />
            <div className="image-wrapper">
              <img
                src={productImgUrl ? productImgUrl : 'images/no-category.jpg'}
                alt={productName}
              />
            </div>
            <div className="text-wrapper">
              <div>
                <b>{this.renderName()}</b>
              </div>
              <span>
                <b>{count}</b> x{' '}
                {Number((unitPrice || 0).toFixed(1)).toLocaleString()}₮
              </span>
            </div>
            <div className="count-wrapper">
              <button
                className={countType === COUNT_TYPES.MINUS ? 'active' : ''}
                onClick={() => onDecCount(COUNT_TYPES.MINUS)}
              >
                <b>{__('-')}</b>
              </button>
              {/* <span>{count}</span> */}
              <button
                className={countType === COUNT_TYPES.PLUS ? 'active' : ''}
                onClick={() => onIncCount(COUNT_TYPES.PLUS)}
              >
                <b>{__('+')}</b>
              </button>
            </div>
          </SelectedStage>
        </SelectedItem>
      );
    }

    return (
      <Item>
        <FlexBetween>
          <Text>
            {this.renderCheckbox()}
            <div>
              <b>{this.renderName()}</b>
              <span>
                {Number((unitPrice || 0).toFixed(1)).toLocaleString()}₮
              </span>
            </div>
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
            <Icon icon="cancel-1" />
          </Close>
        </FlexBetween>
      </Item>
    );
  } // end render()
}
