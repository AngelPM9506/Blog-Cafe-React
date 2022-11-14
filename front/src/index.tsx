import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components';
import './scss/index.scss';
import { store } from './store';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://127.0.0.1:3001/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
);

// const toRender = (
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

// const container = document.getElementById('root');

// ReactDOM.render(toRender, container)