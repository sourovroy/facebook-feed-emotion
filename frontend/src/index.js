import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

import store from './store/index';
import theme from './theme';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
