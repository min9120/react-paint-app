import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { createStore } from 'redux';
import App from './pages/App';
import reducer from './store/modules/painter';

const store = createStore(reducer);
export type RootStoreState = ReturnType<typeof store.getState>;

ReactDOM.render(
  <Provider store = {store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </Provider>
,
  document.getElementById('root')
);
