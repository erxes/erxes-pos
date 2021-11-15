import dayjs from 'dayjs';
import T from 'i18n-react';
import { IUser, IConfig } from './types';
import React from 'react';

interface IState {
  currentUser?: IUser;
  plugins?;
  currentLanguage: string;
  currentConfig?: IConfig;
}

interface IStore extends IState {
  currentUser?: IUser;
  currentConfig?: IConfig;
  changeLanguage: (languageCode: string) => void;
}

interface IProps {
  currentUser?: IUser;
  plugins?: any;
  currentConfig?: IConfig;
}

export const AppContext = React.createContext({} as IStore);

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    // initiliaze locale ======
    const currentLanguage = localStorage.getItem('currentLanguage') || 'mn';

    this.state = {
      currentUser: props.currentUser,
      currentLanguage,
      currentConfig: props.currentConfig
    };

    this.setLocale(currentLanguage);
  }

  setLocale = (currentLanguage: string): void => {
    if (currentLanguage !== 'mn') {
      import(`dayjs/locale/${currentLanguage}`)
        .then(() => dayjs.locale(currentLanguage))
        .catch(_ => dayjs.locale('en'));
    }

    import(`locales/${currentLanguage}.json`)
      .then(data => {
        console.log(data, 'dadada')
        const translations = data.default;
        T.setTexts(translations);
      })
      .catch(e => console.log(e)); // tslint:disable-line
  };

  changeLanguage = (languageCode): void => {
    if (this.state.currentLanguage !== languageCode) {
      localStorage.setItem('currentLanguage', languageCode || 'mn');
      window.location.reload();
    }
  };

  public render() {
    const { currentUser, currentLanguage, currentConfig } = this.state;

    return (
      <AppContext.Provider
        value={{
          currentUser,
          plugins: this.props.plugins,
          currentLanguage,
          changeLanguage: this.changeLanguage,
          currentConfig
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
