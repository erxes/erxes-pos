import React from 'react';

import { __ } from 'modules/common/utils';
import Button from 'modules/common/components/Button';
import { EbarimtButton } from '../kiosk/style';
import { BILL_TYPES } from '../../../../constants';

type Props = {
  billType: string;
  isPortrait: boolean | undefined;
  show: boolean;
  onBillTypeChange: (e: any) => void;
  onStateChange: (key: string, value: any) => void;
  makePayment: () => void;
};

export default class EntitySelector extends React.Component<Props> {
  render() {
    const { isPortrait, onBillTypeChange, billType, makePayment } = this.props;

    const onClick = (type: string) => {
      onBillTypeChange(type);

      makePayment();
    }

    return (
      <EbarimtButton isPortrait={isPortrait}>
        <Button
          className={billType === BILL_TYPES.CITIZEN ? 'active' : ''}
          onClick={() => onClick(BILL_TYPES.CITIZEN)}
          size="large"
        >
          {__('Person')}
        </Button>
        <Button
          className={billType === BILL_TYPES.ENTITY ? 'active' : ''}
          onClick={() => onClick(BILL_TYPES.ENTITY)}
          size="large"
        >
          {__('Organization')}
        </Button>
      </EbarimtButton>
    );
  } // end render()
}
