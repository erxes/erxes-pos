import { IUser } from 'modules/auth/types';
import { IRouterProps } from '../../../types';
import { bustIframe } from 'modules/common/utils';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, MainWrapper } from '../styles';
import DetectBrowser from './DetectBrowser';

interface IProps extends IRouterProps {
  currentUser?: IUser;
  children: React.ReactNode;
}

class MainLayout extends React.Component<IProps, { isCollapsed: boolean }> {
  constructor(props) {
    super(props);
    const hasWideNav = localStorage.getItem('navigation');

    this.state = {
      isCollapsed: hasWideNav ? (hasWideNav === 'true' ? true : false) : false
    };
  }

  componentDidMount() {
    const { history, currentUser } = this.props;

    if (history.location.pathname !== '/reset-password' && !currentUser) {
      history.push('/sign-in');
    }

    // click-jack attack defense
    bustIframe();
  }

  onCollapseNavigation = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed }, () => {
      localStorage.setItem('navigation', this.state.isCollapsed.toString());
    });
  };

  render() {
    const { children } = this.props;
    const { isCollapsed } = this.state;

    console.log('mamama')
    
    return (
      <>
        <div id="anti-clickjack" style={{ display: 'none' }} />
        <Layout>
          <MainWrapper collapsed={isCollapsed}>
            {children}
          </MainWrapper>
          <DetectBrowser />
        </Layout>
      </>
    );
  }
}

export default withRouter(MainLayout);
