import React from 'react';
import styled from 'styled-components';
import FormControl from 'modules/common/components/form/Control';
import FormGroup from 'modules/common/components/form/Group';
import { __ } from 'modules/common/utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  totalAmount: number;
  makePayment: (params: any) => void;
  setOrderState: (name: string, value: any) => void;
}

export default class Calculation extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  
  onChange(e) {
    const value = (e.target as HTMLInputElement).value;

    this.props.setOrderState('type', value);
  }

  render() {
    const { totalAmount, makePayment } = this.props;

    return (
      <Wrapper>
        <span>Calculation</span>
        <div>{totalAmount}</div>
        <div>
          <p>{'When contacts enroll in this workflow'}</p>
          <FormGroup>
            <FormControl componentClass="radio" value="take" inline={true} name="type" onChange={this.onChange}>
              {__('Take')}
            </FormControl>
            <FormControl componentClass="radio" value="eat" inline={true} name="type" onChange={this.onChange}>
              {__('Eat')}
            </FormControl>
            <FormControl componentClass="radio" value="save" inline={true} name="type" onChange={this.onChange}>
              {__('Save')}
            </FormControl>
          </FormGroup>
        </div>
        <button onClick={makePayment}>Make order</button>
      </Wrapper>
    );
  }
};
