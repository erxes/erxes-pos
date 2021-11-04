import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import FormControl from "modules/common/components/form/Control";
import FormGroup from "modules/common/components/form/Group";
import { __ } from "modules/common/utils";
import { ORDER_TYPES } from "../../../constants";
import { ProductLabel, StageContent } from "../styles";
import ControlLabel from "modules/common/components/form/Label";
import { FlexBetween, ColumnBetween } from "modules/common/styles/main";
import { formatNumber } from "modules/utils";
import Button from "modules/common/components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 100%;
`;

const Description = styled.div`
  color: #888;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Amount = styledTS<{ odd?: boolean }>(styled(FlexBetween))`
  border: 1px solid #cbd2d9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  border-color:${(props) => props.odd && "#6569df"}
  color:${(props) => props.odd && "#6569df"}
`;

const ButtonWrapper = styled.div`
  margin-bottom: 30px;
`;

type Props = {
  totalAmount: number;
  makePayment: (params: any) => void;
  setOrderState: (name: string, value: any) => void;
};

export default class Calculation extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = (e.target as HTMLInputElement).value;

    this.props.setOrderState("type", value);
  }

  render() {
    const { totalAmount, makePayment } = this.props;

    return (
      <>
        <Wrapper>
          <ProductLabel>Calculation</ProductLabel>
          <ColumnBetween>
            <div>
              <FormGroup>
                <StageContent>
                  <ControlLabel>Choose type</ControlLabel>
                  <Description>Choose type from following options</Description>
                </StageContent>
                <FormControl
                  componentClass="radio"
                  value={ORDER_TYPES.TAKE}
                  inline={true}
                  name="type"
                  onChange={this.onChange}
                >
                  {__("Take")}
                </FormControl>
                <FormControl
                  componentClass="radio"
                  value={ORDER_TYPES.EAT}
                  inline={true}
                  name="type"
                  onChange={this.onChange}
                >
                  {__("Eat")}
                </FormControl>
                <FormControl
                  componentClass="radio"
                  value={ORDER_TYPES.SAVE}
                  inline={true}
                  name="type"
                  onChange={this.onChange}
                >
                  {__("Save")}
                </FormControl>
              </FormGroup>
              <Amount>
                <span>Discount</span>
                {formatNumber(0)}₮
              </Amount>
              <Amount>
                <span>Total</span>
                {formatNumber(totalAmount || 0)}₮
              </Amount>
              <Amount odd={true}>
                <span>Amount to pay</span>
                {formatNumber(totalAmount || 0)}₮
              </Amount>

              <ProductLabel>Төлбөрийн хэрэгсэл</ProductLabel>
              <ProductLabel>Баримт хэвлэх</ProductLabel>

              <StageContent>
                <Amount>
                  <span>Төлсөн дүн</span>
                  {formatNumber(0)}₮
                </Amount>
                <Amount>
                  <span>Хариулт</span>
                  {formatNumber(0)}₮
                </Amount>
              </StageContent>
            </div>
            <ButtonWrapper>
              <Button
                btnStyle="success"
                onClick={makePayment}
                icon="check-circle"
                block
              >
                Make Order
              </Button>
            </ButtonWrapper>
          </ColumnBetween>
        </Wrapper>
      </>
    );
  }
}
