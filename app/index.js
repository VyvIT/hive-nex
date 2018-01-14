import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
// import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';
import App from './App/App';
import LanguageProvider from 'containers/LanguageProvider';

/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
//TODO: manifest file
// import '!file-loader?name=[name].[ext]!./manifest.json';
// import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './configureStore';
// Import i18n messages
import { translationMessages } from './i18n';
// Import CSS reset and Global Styles
import './global-styles';

/*
 // Observe loading of Open Sans (to remove open sans, remove the <link> tag in
 // the index.html file and this observer)
 const openSansObserver = new FontFaceObserver('Open Sans', {});
 // When Open Sans is loaded, add a font-family using Open Sans to the body
 openSansObserver.load().then(() => {
 document.body.classList.add('fontLoaded');
 }, () => {
 document.body.classList.remove('fontLoaded');
 });
 */

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = (messages, App) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App/>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  module.hot.accept(['./i18n', 'App/App'], () => {
    const NextApp = require('App/App').default;
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages, NextApp);
  });
}

render(translationMessages, App);