import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vk-connect';

import App from './App';

import AppContextProvider from './context/AppContext';
import HelpContextProvider from './context/HelpContext';
import MarketContextProvider from './context/MarketContext';

connect.send('VKWebAppInit');

const Application = () => {
  return (
    <AppContextProvider>
      <HelpContextProvider>
        <MarketContextProvider>
          <App/>
        </MarketContextProvider>
      </HelpContextProvider>
    </AppContextProvider>
  )
};

ReactDOM.render(<Application />, document.getElementById('root'));
