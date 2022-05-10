import React from "react";
import gql from "graphql-tag";

import apolloClient from "apolloClient";
import { mutations } from "../../../graphql/index";
import { IInvoiceCheckParams, IOrder } from "modules/orders/types";
import { CardInputColumn, Input } from "modules/orders/styles";
import { Alert, __ } from "modules/common/utils";
import FormGroup from "modules/common/components/form/Group";
import ControlLabel from "modules/common/components/form/Label";
import NumberFormat from "react-number-format";
import Icon from "modules/common/components/Icon";
import Button from "modules/common/components/Button";
import QPayModalContent from "./QPayModalContent";
import { IQPayInvoice } from "modules/qpay/types";
import { FlexCenter } from "modules/common/styles/main";

type Props = {
  order: IOrder;
  billType: string;
  checkQPayInvoice: (params: IInvoiceCheckParams) => void;
  cancelQPayInvoice: (id: string) => void;
  maxAmount?: number;
  mobileAmount: number;
  setAmount: (n: number) => void;
  refetchOrder: () => void;
};

type State = {
  showModal: boolean;
  invoice: IQPayInvoice | null;
};

export default class QPaySection extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { showModal: false, invoice: null };
  }

  renderModal() {
    const { cancelQPayInvoice, checkQPayInvoice, order, refetchOrder } =
      this.props;

    return (
      <QPayModalContent
        cancelQPayInvoice={cancelQPayInvoice}
        checkQPayInvoice={checkQPayInvoice}
        order={order}
        showModal={this.state.showModal}
        invoice={this.state.invoice}
        toggleModal={() => this.setState({ showModal: !this.state.showModal })}
        setInvoice={(invoice) => this.setState({ invoice })}
        refetchOrder={refetchOrder}
      />
    );
  }

  render() {
    const { order, maxAmount = 0, setAmount, mobileAmount } = this.props;

    const handleInput = (value: number | undefined = 0) => {
      // do not accept amount greater than payable amount
      const val = Number((value > maxAmount ? maxAmount : value).toFixed(2));

      setAmount(val);
    };

    const inputProps: any = {
      allowNegative: false,
      thousandSeparator: true,
      prefix: "₮",
      inputMode: "numeric",
    };

    const resetInput = () => {
      setAmount(0);
    };

    const createInvoice = () => {
      if (mobileAmount >= 10) {
        apolloClient
          .mutate({
            mutation: gql(mutations.createQpaySimpleInvoice),
            variables: { orderId: order._id, amount: mobileAmount },
          })
          .then(({ data }) => {
            this.setState({
              showModal: true,
              invoice: data.createQpaySimpleInvoice,
            });
          })
          .catch((e) => {
            Alert.error(e.message);
          });
      } else {
        return Alert.warning(__("QPay invoice amount is too small"));
      }
    };

    return (
      <FlexCenter>
        <CardInputColumn>
          <FormGroup>
            <ControlLabel>{__("Pay with QPay")}</ControlLabel>
            <Input>
              <NumberFormat
                name="mobileAmount"
                value={mobileAmount}
                onValueChange={(values) => handleInput(values.floatValue)}
                {...inputProps}
              />
              <div onClick={resetInput}>
                <Icon icon="cancel" size={13} />
              </div>
            </Input>
          </FormGroup>

          {mobileAmount ? (
            <Button
              size="small"
              btnStyle="warning"
              block
              onClick={createInvoice}
            >
              {__("Create invoice")}
            </Button>
          ) : null}

          {this.renderModal()}
        </CardInputColumn>
      </FlexCenter>
    );
  }
}
