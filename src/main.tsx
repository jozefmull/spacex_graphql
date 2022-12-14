import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GlobalProvider } from './context/GlobalState';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Theme'

import { BrowserRouter as Router } from 'react-router-dom'
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'https://api.spacex.land/graphql/',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <GlobalProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </GlobalProvider>
    </Provider>
  </React.StrictMode>
)
