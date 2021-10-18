import { AppConsumer, AppProvider } from 'appContext';
import { IUser } from 'modules/auth/types';
import React from 'react';
import MainLayout from '../components/MainLayout';

type Props = {
  currentUser?: IUser;
  plugins?: any;
  children: React.ReactNode;
};

const container = (props: Props) => (
  <AppProvider currentUser={props.currentUser} plugins={props.plugins}>
    <AppConsumer>
      {() => (
        <MainLayout {...props} />
      )}
    </AppConsumer>
  </AppProvider>
);
export default container;
