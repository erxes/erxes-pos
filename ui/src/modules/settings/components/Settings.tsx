import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NameCard from "modules/common/components/nameCard/NameCard";
import { IUser } from "modules/auth/types";
import { PosWrapper, MainContent } from "../../orders/styles";
import { FlexBetween } from "modules/common/styles/main";
import { IConfig } from "types";
import Button from "modules/common/components/Button";
import { __ } from "modules/common/utils";
import { StageContent } from "../../orders/styles";
import { FormGroup } from "modules/common/components/form";
import ControlLabel from 'modules/common/components/form/Label';
import FormControl from 'modules/common/components/form/Control';

type Props = {
  syncConfig: (type: string) => void;
  currentUser: IUser;
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

  onChangeMode = (e) => {
    e.preventDefault();
    const mode = e.target.value;

    this.setState({ mode })
    localStorage.setItem('erxesPosMode', mode);
  }

  render() {
    const { currentUser, currentConfig } = this.props;

    return (
      <PosWrapper>
        <Row>
          <Col md={6}>
            <MainContent hasBackground={true} hasShadow={true}>
              <FlexBetween>
                <NameCard user={currentUser} avatarSize={40} />
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
