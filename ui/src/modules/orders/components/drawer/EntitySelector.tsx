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
};

export default class EntitySelector extends React.Component<Props> {
  render() {
    const { isPortrait, onBillTypeChange, billType } = this.props;

    return (
      <EbarimtButton isPortrait={isPortrait}>
        <Button
          className={billType === BILL_TYPES.CITIZEN ? 'active' : ''}
          onClick={() => onBillTypeChange(BILL_TYPES.CITIZEN)}
          size="large"
        >
          {__('Person')}
        </Button>
        <Button
          className={billType === BILL_TYPES.ENTITY ? 'active' : ''}
          onClick={() => onBillTypeChange(BILL_TYPES.ENTITY)}
          onMouseDown={onBillTypeChange}
          size="large"
        >
          {__('Organization')}
        </Button>
      </EbarimtButton>
    );
  } // end render()
}
