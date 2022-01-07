import Button from 'modules/common/components/Button';
import React from 'react';
import { __ } from 'modules/common/utils';
import { Detail, Status, TableRow, TimeGroup } from '../styles';
import { IConfig } from 'types';
import { IOrder } from '../../orders/types';
import { IUser } from 'modules/auth/types';
import { useTime } from 'react-timer-hook';

type Props = {
  editOrder: (doc) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  order: IOrder;
};

type State = {

}

function Timer({ oTime }) {
  const {
    seconds,
    minutes,
    hours,
  } = useTime({});

  const time = seconds + minutes * 60 + hours * 3600;
  let diffSeconds = time - oTime;

  const diffHours = Math.floor(diffSeconds / 3600);
  diffSeconds = diffSeconds - diffHours * 3600
  const diffMinutes = Math.floor(diffSeconds / 60);
  diffSeconds = diffSeconds - diffMinutes * 60

  return (
    <TimeGroup>
      <span>{diffHours}</span>:<span>{diffMinutes}</span>:<span>{diffSeconds || 60}</span>
    </TimeGroup>
  )
}

export default class OrderDetail extends React.Component<Props, State> {
  renderTime(order) {
    const date = new Date(order.paidDate)

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const oTime = seconds + minutes * 60 + hours * 3600;

    return (
      <Timer oTime={oTime} />
    )
  }

  renderDetail(order) {
    const { items } = order;

    if (!items || !items.length) {
      return null;
    }

    return items.map((item) => (
      <Detail key={item._id}>
        <p><b>{item.productName}</b></p>
        <span>
          {__("Quantity")}:&nbsp;
        </span>
        <p><b>{item.count}</b></p>
      </Detail>
    ));
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
      this.props.editOrder({ _id: order._id, status: 'done', number: order.number });
    };

    return (
      <Button size="small" btnStyle="success" icon="check-circle" onClick={toDone}>
        ready
      </Button>
    );
  };

  render() {
    const { order, currentConfig } = this.props;
    const { uiOptions } = currentConfig || ({} as IConfig);
    const color = uiOptions.colors.primary;

    return (
      <TableRow key={order._id} id={order._id} color={color}>
        <td className="number center">{order.number.split("_")[1]}</td>
        <td>{this.renderDetail(order)}</td>
        <td>{this.renderTime(order)}</td>
        <td className="center">
          <Status color={order.type === 'eat' ? color : 'red'}>{__(order.type)}</Status>
        </td>
        <td>{this.renderActions(order)}</td>
      </TableRow>
    );
  } // end render()
}
