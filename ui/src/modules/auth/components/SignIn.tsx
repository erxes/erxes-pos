import Form from 'modules/common/components/form/Form';
import FormControl from 'modules/common/components/form/Control';
import FormGroup from 'modules/common/components/form/Group';
import React from 'react';
import Select from 'react-select-plus';
import { __ } from 'modules/common/utils';
import { AuthBox, ChooseConfig, Links } from '../styles';
import { IButtonMutateProps, IConfig } from '../../../types';
import { Link } from 'react-router-dom';

type Props = {
  configs: IConfig[];
  onChangeConfig: (token: string) => void;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  currentConfig: IConfig;
};

class SignIn extends React.Component<Props> {
  renderContent = (formProps) => {
    const { values, isSubmitted } = formProps;

    return (
      <>
        <FormGroup>
          <FormControl
            {...formProps}
            name="email"
            placeholder={__('registered@email.com')}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <FormControl
            {...formProps}
            name="password"
            type="password"
            placeholder={__('password')}
            required={true}
          />
        </FormGroup>

        {this.props.renderButton({
          values,
          isSubmitted,
        })}
      </>
    );
  };

  render() {
    const { currentConfig, configs } = this.props;
    const { colors = {} } = (currentConfig || {}).uiOptions || {};

    return (
      <AuthBox mainColor={colors.primary}>
        {configs && configs.length > 1 && (
          <ChooseConfig mainColor={colors.primary}>
            <h1>{__('Choose POS')}</h1>
            <Select
              options={(configs || []).map((c) => {
                return {
                  label: `${c.name} - ${c.token}`,
                  value: c.token,
                };
              })}
              clearable={true}
              value={currentConfig.token}
              onChange={({ value }) => this.props.onChangeConfig(value)}
            />
          </ChooseConfig>
        )}
        <h2>{__('Sign in')}</h2>
        <Form renderContent={this.renderContent} />
        <Links>
          <Link to="/forgot-password">{__('Forgot password?')}</Link>
        </Links>
      </AuthBox>
    );
  }
}

export default SignIn;
