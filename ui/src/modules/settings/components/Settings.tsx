import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NameCard from "modules/common/components/nameCard/NameCard";
import { IUser } from "modules/auth/types";
import {
  PosWrapper,
  MainContent
} from "../../orders/styles";
import { FlexBetween } from "modules/common/styles/main";
import { IConfig } from "types";

type Props = {
  syncConfig: (type: string) => void;
  currentUser: IUser;
  currentConfig: IConfig;
  syncOrders: () => void;
};

type State = {

};

export default class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const {
      currentUser
    } = this.props;

    console.log('qqqqqqqqqqqqqqqqqq')

    return (
      <PosWrapper>
        <Row>
          <Col md={6}>
            <MainContent hasBackground={true}>
              <FlexBetween>
                <NameCard user={currentUser} avatarSize={40} />
              </FlexBetween>
            </MainContent>
          </Col>
        </Row>
      </PosWrapper>
    );
  } // end render()
}
