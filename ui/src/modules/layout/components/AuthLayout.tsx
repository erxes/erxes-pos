import Button from "modules/common/components/Button";
import { __, bustIframe } from "modules/common/utils";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {
  AuthContent,
  AuthDescription,
  Authlayout,
  CenterContent,
  MobileRecommend,
} from "../styles";
import { IConfig } from "types";
import withCurrentUser from "modules/auth/containers/withCurrentUser";

type Props = {
  content: React.ReactNode;
  currentConfig: IConfig;
  description?: React.ReactNode;
  col?: { first: number; second: number };
};

class AuthLayout extends React.Component<Props, {}> {
  renderContent(desciption: string, link: string) {
    return (
      <MobileRecommend>
        <CenterContent>
          <div>
            <b>{__("erxes Inc")}</b>
            <div>{__(desciption)}</div>
          </div>
          <Button btnStyle="link" size="small" href={link}>
            {__("Get")}
          </Button>
        </CenterContent>
      </MobileRecommend>
    );
  }

  renderDesciption() {
    const { description, currentConfig } = this.props;
    const { uiOptions, name } = currentConfig || ({} as IConfig);

    const logo = uiOptions.logo || "/images/logo.png";

    if (description) {
      return (
        <>
          <img src="/images/logo.png" alt={"erxes"} />
          {description}
        </>
      );
    }

    return (
      <>
        <img src={logo} alt={name || "erxes"} />
        <h1>{name || __("Open Source POS system")}</h1>
        <p>{currentConfig.description || __("Collaborates with erxes")}</p>
      </>
    );
  }

  componentDidMount() {
    // click-jack attack defense
    bustIframe();
  }

  render() {
    const {
      content,
      col = { first: 6, second: 5 },
      currentConfig,
    } = this.props;

    return (
      <Authlayout
        className="auth-container"
        hasConfig={currentConfig ? true : false}
      >
        <AuthContent>
          <Container>
            <Col md={col.first}>
              <AuthDescription hasConfig={currentConfig ? true : false}>
                {this.renderDesciption()}
              </AuthDescription>
            </Col>
            <Col md={{ span: col.second, offset: 1 }}>{content}</Col>
          </Container>
        </AuthContent>
      </Authlayout>
    );
  }
}

export default withCurrentUser(AuthLayout);
