import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vk-connect';

import App from './App';

import AppProvider from './context/AppContext';

connect.send('VKWebAppInit');

const Application = () => {
  return (
    <AppProvider>
      <App/>
    </AppProvider>
  )
};

ReactDOM.render(<Application />, document.getElementById('root'));
