import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import { FlexCenter } from "modules/common/styles/main";
import Icon from "modules/common/components/Icon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 50px;

  > input {
    font-size: 15px;
    color: #616e7c;
    border: 1px solid #cbd2d9;
    border-radius: 4px;
    padding: 0 10px;
    font-weight: 500;
    min-width: 32px;
    margin: 0;
    text-align: center;
  }

  @media (max-width: 1170px) {
    margin-right: 35px;
  }
`;

const Button = styledTS<{ disabled: boolean; color?: string }>(
  styled(FlexCenter)
)`
  width: 20px;
  height: 20px;
  margin: 0 8px;
  font-size: 12px;
  color: #616E7C;
  pointer-events: ${(props) => props.disabled && "none"};
  cursor: pointer;

  i {
    &:before {
      font-weight: bolder;
    }

    &.icon-plus {
      color: ${(props) => (props.color ? props.color : "#6569df")};
    }
  }
`;

type Props = {
  step?: number;
  max?: number;
  value: number;
  color: string;
  onChange: (value: number) => void;
};

const formatNumber = (num: number) => {
  return (num || 0).toLocaleString(undefined, {
    maximumFractionDigits: 5,
  });
};

const Quantity = (props: Props) => {
  const { value, step = 1, onChange, max, color } = props;
  const [inputValue, setInputValue] = useState(formatNumber(value));

  useEffect(() => {
    setInputValue(formatNumber(value));
  }, [value]);

  let changedValue = value;

  const isDisabled = (up: boolean) => {
    const checkValue = up ? max : 0;

    if (changedValue === checkValue) {
      return true;
    }

    return false;
  };

  const changeValue = (val: number) => {
    setInputValue(formatNumber(val));
    onChange(val);
  };

  const onChangeInput = (e) => {
    // convert and clean string value
    changeValue(parseInt(e.target.value));
  };

  const onChangeByStep = (increase: boolean) => {
    if (increase) {
      changedValue = value + step;
    } else {
      changedValue = value - step;
    }

    changeValue(changedValue);
  };

  return (
    <Wrapper>
      <Button
        disabled={isDisabled(false)}
        onClick={() => onChangeByStep(false)}
      >
        <Icon icon="minus" />
      </Button>
      <input
        style={{ width: inputValue.length * 9 + 24 + "px" }}
        type="text"
        value={inputValue}
        onChange={onChangeInput}
      />
      <Button
        disabled={isDisabled(true)}
        onClick={() => onChangeByStep(true)}
        color={color}
      >
        <Icon icon="plus" />
      </Button>
    </Wrapper>
  );
};

export default Quantity;
