import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vk-connect';

import App from './Components/App/App';

import AppContextProvider from './Contexts/AppContext';
import HelpContextProvider from './Contexts/HelpContext';
import MarketContextProvider from './Contexts/MarketContext';

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
