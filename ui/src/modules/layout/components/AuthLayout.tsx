import Button from 'modules/common/components/Button';
import { __, bustIframe } from 'modules/common/utils';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {
  AuthContent,
  AuthDescription,
  Authlayout,
  CenterContent,
  MobileRecommend
} from '../styles';

type Props = {
  content: React.ReactNode;
  description?: React.ReactNode;
  col?: { first: number; second: number };
};

class AuthLayout extends React.Component<Props, {}> {
  renderContent(desciption: string, link: string) {
    return (
      <MobileRecommend>
        <CenterContent>
          <div>
            <b>{__('erxes Inc')}</b>
            <div>{__(desciption)}</div>
          </div>
          <Button btnStyle="link" size="small" href={link}>
            {__('Get')}
          </Button>
        </CenterContent>
      </MobileRecommend>
    );
  }

  renderDesciption() {
    const { description } = this.props;

    if (description) {
      return (
        <>
          <img src="/images/logo.png" alt="erxes" />
          {description}
        </>
      );
    }

    return (
      <>
        <img src="/images/logo.png" alt="erxes" />
        <h1>{__('Open Source POS system')}</h1>
        <p>
          {__(
            'Collaborates with erxes'
          )}
        </p>
        <a href={__('Homepage link')}>« {__('Go to home page')}</a>
      </>
    );
  }

  componentDidMount() {
    // click-jack attack defense
    bustIframe();
  }

  render() {
    const { content, col = { first: 6, second: 5 } } = this.props;

    return (
      <Authlayout className="auth-container">
        <AuthContent>
          <Container>
            <Col md={col.first}>
              <AuthDescription>{this.renderDesciption()}</AuthDescription>
            </Col>
            <Col md={{ span: col.second, offset: 1 }}>{content}</Col>
          </Container>
        </AuthContent>
      </Authlayout>
    );
  }
}

export default AuthLayout;
