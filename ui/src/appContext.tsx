// import dayjs from 'dayjs';
// import T from 'i18n-react';
import { IUser } from './types';
import React from 'react';

interface IState {
  currentUser?: IUser;
  plugins?;
  currentLanguage: string;
}

interface IStore extends IState {
  currentUser?: IUser;
  changeLanguage: (languageCode: string) => void;
}

const AppContext = React.createContext({} as IStore);

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component<
  { currentUser?: IUser, plugins?  },
  IState
> {
  constructor(props) {
    super(props);

    // initiliaze locale ======
    const currentLanguage = localStorage.getItem('currentLanguage') || 'en';

    this.state = {
      currentUser: props.currentUser,
      currentLanguage
    };

    // this.setLocale(currentLanguage);
  }

  // setLocale = (currentLanguage: string): void => {
  //   if (currentLanguage !== 'mn') {
  //     import(`dayjs/locale/${currentLanguage}`)
  //       .then(() => dayjs.locale(currentLanguage))
  //       .catch(_ => dayjs.locale('en'));
  //   }

  //   import(`locales/${currentLanguage}.json`)
  //     .then(data => {
  //       const translations = data.default;
  //       T.setTexts(translations);
  //     })
  //     .catch(e => console.log(e)); // tslint:disable-line
  // };

  changeLanguage = (languageCode): void => {
    if (this.state.currentLanguage !== languageCode) {
      localStorage.setItem('currentLanguage', languageCode || 'en');
      window.location.reload();
    }
  };

  public render() {
    const { currentUser, currentLanguage } = this.state;

    console.log(this.state, 'sssss')

    return (
      <AppContext.Provider
        value={{
          currentUser,
          plugins: this.props.plugins,
          currentLanguage,
          changeLanguage: this.changeLanguage
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
