import React from 'react';

import { __ } from 'modules/common/utils';
import Button from 'modules/common/components/Button';
import { EbarimtButton } from '../kiosk/style';
import { BILL_TYPES, POS_MODES } from '../../../../constants';

type Props = {
  billType: string;
  isPortrait: boolean | undefined;
  show: boolean;
  onBillTypeChange: (e: any) => void;
  onStateChange: (key: string, value: any) => void;
  settlePayment: () => void;
  mode: string;
  allowInnerBill: boolean;
};

export default class EntitySelector extends React.Component<Props> {
  render() {
    const { isPortrait, onBillTypeChange, billType, settlePayment, mode, allowInnerBill } = this.props;

    const onClickCitizen = (type: string) => {
      onBillTypeChange(type);

      settlePayment();
    }

    const onClickInner = (type: string) => {
      onBillTypeChange(type);

      setTimeout(() => {
        settlePayment();
      }, 300);
    }

    return (
      <EbarimtButton isPortrait={isPortrait}>
        <Button
          className={billType === BILL_TYPES.CITIZEN ? 'active' : ''}
          onClick={() => onClickCitizen(BILL_TYPES.CITIZEN)}
          size="large"
        >
          {__('Person')}
        </Button>
        <Button
          className={billType === BILL_TYPES.ENTITY ? 'active' : ''}
          onClick={() => onBillTypeChange(BILL_TYPES.ENTITY)}
          size="large"
        >
          {__('Organization')}
        </Button>
        {
          mode !== POS_MODES.KIOSK && allowInnerBill &&
          < Button
            className={billType === BILL_TYPES.INNER ? 'active' : ''}
            onClick={() => onClickInner(BILL_TYPES.INNER)}
            size="large"
          >
            {__('Inner')}
          </Button>
        }
      </EbarimtButton>
    );
  } // end render()
}
