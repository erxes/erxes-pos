import React from "react";
import { useTime } from "react-timer-hook";

import Button from "modules/common/components/Button";
import { __ } from "modules/common/utils";
import { Detail, Status, TableRow, TimeGroup } from "../styles";
import { IConfig } from "types";
import { FullOrderQueryResponse, IOrder, IOrderItem } from "../../orders/types";
import { IUser } from "modules/auth/types";
import Icon from "modules/common/components/Icon";
import { ORDER_ITEM_STATUSES, POS_MODES } from "../../../constants";
import { colors } from "modules/common/styles";
import FormControl from "modules/common/components/form/Control";

type Props = {
  editOrder: (doc) => void;
  changeOrderItemStatus: (doc) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  order: IOrder;
  orderQuery: FullOrderQueryResponse;
};

function Timer({ oTime }) {
  const { seconds, minutes, hours } = useTime({});

  const time = seconds + minutes * 60 + (hours || 24) * 3600;
  let diffSeconds = time - oTime;

  if (diffSeconds < 0) {
    diffSeconds = diffSeconds + 24 * 60 * 60;
  }

  const diffHours = Math.floor(diffSeconds / 3600);
  diffSeconds = diffSeconds - diffHours * 3600;
  const diffMinutes = Math.floor(diffSeconds / 60);
  diffSeconds = diffSeconds - diffMinutes * 60;

  return (
    <TimeGroup>
      <span>{diffHours}</span>:<span>{diffMinutes}</span>:
      <span>{diffSeconds || 60}</span>
    </TimeGroup>
  );
}

export default class OrderDetail extends React.Component<Props> {
  private myRef: React.MutableRefObject<{} | null>;
  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
  }
  renderTime(order) {
    const date = new Date(order.paidDate);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const oTime = seconds + minutes * 60 + hours * 3600;

    return <Timer oTime={oTime} />;
  }
  componentDidUpdate() {
    const checkOrder = this.props.order || {} as IOrder;
    if (checkOrder) {
      this.myRef.current = checkOrder.items;

      if (checkOrder.items.every(item => item.status === ORDER_ITEM_STATUSES.DONE)) {
        this.props.editOrder({
          _id: checkOrder._id,
          status: "done",
          number: checkOrder.number,
        });
      }
    }
  }

  renderDetail(order: IOrder, color: string, color2: string) {
    const { items } = order;
    if (!items || !items.length) {
      return null;
    }

    const onItemCheck = (item) => {
      if (item.target.checked === true) {
        this.props.changeOrderItemStatus({
          _id: item.target.value,
          status: ORDER_ITEM_STATUSES.DONE
        });
      }
      if (item.target.checked === false) {
        this.props.changeOrderItemStatus({
          _id: item.target.value,
          status: ORDER_ITEM_STATUSES.CONFIRM
        });
      }
      this.props.orderQuery.refetch();
    }
    return items.map((item: IOrderItem, index) => (
      <Detail key={item._id}>
        <p>
          <Icon
            icon={item.isTake ? "plane-departure" : "utensils"}
            color={item.isTake ? color : color2}
          />
          <b>{item.productName}</b>
        </p>
        <span>{__("Quantity")}:&nbsp;</span>
        <p>
          {
          this.renderItemCount(
            item.count,
            this.myRef.current ? 
              this.myRef.current[index] === undefined ? 
                0 
              : this.myRef.current[index].count 
            : 0
          )}
        </p>
        <p>
          <FormControl
            type="checkbox"
            round={true}
            name="itemStatus"
            value={item._id}
            checked={item.status === 'done'}
            onChange={onItemCheck}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </p>
      </Detail>
    ));
  }
  renderItemCount = (count: number, previousCount: number) => {
    const checkCount = () => {
      if (count - previousCount < 0) {
        return (
          <span style={{'color': '#f53b57'}}>
            {' ' + (count - previousCount)}
          </span>
        );  
      }
      if (count - previousCount > 0) {
        return (
          <span style={{'color': '#4cd137'}}>
            {' +' + (count - previousCount)}
          </span>
        );
      }
      return '';
    }
    return (
      <>
        <b>{count}</b>
        {checkCount()}
      </>
    )
  }
  renderActions = (order) => {
    if (order.status === "new") {
      return (
        <>
          <Button size="small" btnStyle="primary" icon="play-1">
            Start
          </Button>
          <Button size="small" btnStyle="danger" icon="cancel-1">
            Decline
          </Button>
        </>
      );
    }

    const toDone = () => {
      this.props.editOrder({
        _id: order._id,
        status: "done",
        number: order.number,
      });
      order.items.forEach(item => {
        this.props.changeOrderItemStatus({
          _id: item._id,
          status: ORDER_ITEM_STATUSES.DONE
        });
      });
    };

    return (
      <Button
        size="small"
        btnStyle="success"
        icon="check-circle"
        onClick={toDone}
      >
        ready
      </Button>
    );
  };

  render() {
    const { order, currentConfig } = this.props;
    const { uiOptions } = currentConfig || ({} as IConfig);
    let background = colors.colorWhite;
    const color = uiOptions.colors.primary;
    const color2 = uiOptions.colors.secondary;

    const backgroundColor = () => {
      switch (order.type) {
        case "take":
          return (background = colors.colorCoreRed);
        case "delivery":
          return (background = colors.colorCoreBlue);
        default:
          return background;
      }
    };

    return (
      <TableRow key={order._id} id={order._id} background={backgroundColor()}>
        <td className="number center">{order.number.split("_")[1]}</td>
        <td>{this.renderDetail(order, color, color2)}</td>
        <td>{order.origin === POS_MODES.POS ? "POS" : order.origin}</td>
        <td>{this.renderTime(order)}</td>
        <td className="center">
          <Status color={order.type === "eat" ? color2 : color}>
            {__(order.type)}
          </Status>
        </td>
        <td>{this.renderActions(order)}</td>
      </TableRow>
    );
  } // end render()
}
