import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components';
import './scss/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// const toRender = (
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

// const container = document.getElementById('root');

// ReactDOM.render(toRender, container)