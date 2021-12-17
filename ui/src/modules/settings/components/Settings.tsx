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

type Props = {
  syncConfig: (type: string) => void;
  currentUser: IUser;
  currentConfig: IConfig;
  syncOrders: () => void;
};

type State = {};

export default class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
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
            <MainContent hasBackground={true} hasShadow={true}></MainContent>
          </Col>
        </Row>
      </PosWrapper>
    );
  } // end render()
}
