import React from 'react';
import styledTS from 'styled-components-ts';
import styled from 'styled-components';

import Button from 'modules/common/components/Button';
import FormControl from 'modules/common/components/form/Control';
import { FlexCenter } from 'modules/common/styles/main';
import Icon from 'modules/common/components/Icon';
import { __ } from 'modules/common/utils';
import { Input, FormHead, ButtonGroup } from 'modules/orders/styles';
import { BILL_TYPES } from '../../../../constants';

export const FlexCenterFix = styledTS<{ isPortrait?: boolean }>(
  styled(FlexCenter)
)`
  display: flex;

  button {
    margin: ${props => (props.isPortrait ? '10px 0px 0px 40%' : '0 0 0 5px')};
  }
`;

type Props = {
  show: boolean;
  billType: string;
  registerNumber: string;
  checkOrganization: () => void;
  isPortrait: boolean | undefined;
  reset: (key: string) => void;
  color: string;
  onChange: (e: any) => void;
  focusOnKeypads: () => void;
  setBill?: string;
};

export default class RegisterChecker extends React.Component<Props> {
  render() {
    const {
      show,
      billType,
      checkOrganization,
      isPortrait,
      reset,
      color,
      registerNumber,
      onChange,
      focusOnKeypads,
      setBill
    } = this.props;

    if (!show || billType !== BILL_TYPES.ENTITY) {
      return <></>;
    }

    return (
      <FormHead isPortrait={isPortrait}>
        <FlexCenterFix isPortrait={isPortrait}>
          <Input color={color} setBill={setBill}>
            <FormControl
              type="text"
              name="registerNumber"
              onChange={e => onChange(e)}
              value={registerNumber}
              onClick={() => focusOnKeypads()}
            />
            <div onClick={() => reset('registerNumber')}>
              <Icon icon="cancel" size={13} />
            </div>
          </Input>
          <ButtonGroup>
            <Button
              style={{ backgroundColor: color }}
              onClick={() => checkOrganization()}
            >
              {__('Check')}
            </Button>
          </ButtonGroup>
        </FlexCenterFix>
      </FormHead>
    );
  }
}
