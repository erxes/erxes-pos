import React from 'react';

import { __ } from 'modules/common/utils';
import Button from 'modules/common/components/Button';
import { EbarimtButton } from '../kiosk/style';
import { FlexCenter } from 'modules/common/styles/main';

type Props = {
  billType: string;
  isPortrait: boolean | undefined;
  show: boolean;
  onBillTypeChange: (e: any) => void;
  onStateChange: (key: string, value: any) => void;
};

type State = {
  isActive: boolean;
};
export default class Ebarimt extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  render() {
    const { isPortrait, show, onBillTypeChange, onStateChange } = this.props;
    const { isActive } = this.state;

    const onSwitchHandler = e => {
      onStateChange('showE', !show);
    };

    return (
      <React.Fragment>
        <FlexCenter>
          <h2>{__('Obtain a VAT receipt')}</h2>
        </FlexCenter>
        <EbarimtButton isPortrait={isPortrait} isActive={isActive}>
          <Button onClick={onSwitchHandler} size="large">
            {__('Person')}
          </Button>
          <Button
            onClick={onSwitchHandler}
            onMouseDown={onBillTypeChange}
            size="large"
          >
            {__('Organization')}
          </Button>
        </EbarimtButton>
      </React.Fragment>
    );
  } // end render()
}
