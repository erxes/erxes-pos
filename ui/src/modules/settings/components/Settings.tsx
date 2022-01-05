import Button from 'modules/common/components/Button';
import Col from 'react-bootstrap/Col';
import ControlLabel from 'modules/common/components/form/Label';
import FormControl from 'modules/common/components/form/Control';
import NameCard from 'modules/common/components/nameCard/NameCard';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { __ } from 'modules/common/utils';
import { Alert } from 'modules/common/utils';
import { FlexBetween } from 'modules/common/styles/main';
import { FormGroup } from 'modules/common/components/form';
import { IConfig } from 'types';
import { IUser } from 'modules/auth/types';
import { MainContent, PosWrapper } from '../../orders/styles';
import { StageContent } from '../../orders/styles';

type Props = {
  syncConfig: (type: string) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  syncOrders: () => void;
};

type State = {
  mode: string
};

export default class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const mode = localStorage.getItem('erxesPosMode') || '';
    this.state = {
      mode
    };
  }

  onSyncConfig = () => {
    this.props.syncConfig("config");
  };
  onSyncCustomers = () => {
    this.props.syncConfig("customers");
  };
  onSyncProducts = () => {
    this.props.syncConfig("products");
  };
  onSendData = async () => {
    const { ebarimtConfig } = this.props.currentConfig;

    fetch(
      `${ebarimtConfig.ebarimtUrl}/sendData?lib=${ebarimtConfig.companyRD}`
    ).then((res: any) => {
      return Alert.success(`${res}.`);
    }).catch(e => {
      Alert.error(`${e.message}`);
    });
  }

  onChangeMode = (e) => {
    e.preventDefault();
    const mode = e.target.value;

    this.setState({ mode })
    localStorage.setItem('erxesPosMode', mode);
  }

  render() {
    const { posCurrentUser, currentConfig } = this.props;

    return (
      <PosWrapper>
        <Row>
          <Col md={6}>
            <MainContent hasBackground={true} hasShadow={true}>
              <FlexBetween>
                <NameCard user={posCurrentUser} avatarSize={40} />
              </FlexBetween>
              {currentConfig.name}
              {currentConfig.syncInfo && currentConfig.syncInfo.date}

              <StageContent>
                <Button
                  btnStyle="success"
                  onClick={this.onSyncConfig}
                  icon="check-circle"
                  block
                >
                  {__("ReSync Config")}
                </Button>
              </StageContent>
              <StageContent>
                <Button
                  btnStyle="success"
                  onClick={this.onSyncCustomers}
                  icon="check-circle"
                  block
                >
                  {__("ReSync Customers")}
                </Button>
              </StageContent>
              <StageContent>
                <Button
                  btnStyle="success"
                  onClick={this.onSyncProducts}
                  icon="check-circle"
                  block
                >
                  {__("ReSync Products")}
                </Button>
              </StageContent>

              <StageContent>
                <Button
                  btnStyle="warning"
                  onClick={this.props.syncOrders}
                  icon="check-circle"
                  block
                >
                  {__("Sync Orders")}
                </Button>
              </StageContent>

              <StageContent>
                <Button
                  btnStyle="warning"
                  onClick={this.onSendData}
                  icon="check-circle"
                  block
                >
                  {__("Send-Data")}
                </Button>
              </StageContent>
            </MainContent>
          </Col>
          <Col sm={6}>
            <MainContent hasBackground={true} hasShadow={true}>
              <FormGroup>
                <ControlLabel>{__("Select Mode")}</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="lastName"
                  defaultValue={this.state.mode}
                  options={[
                    { value: '', label: 'Pos and full mode' },
                    { value: 'kiosk', label: 'Kiosk Mode' },
                    { value: 'kitchen', label: 'Kitchen Screen' },
                    { value: 'waiting', label: 'Waiting Screen' },
                  ]}
                  onChange={this.onChangeMode}
                  required={true} />
              </FormGroup>
            </MainContent>
          </Col>
        </Row>
      </PosWrapper>
    );
  } // end render()
}
