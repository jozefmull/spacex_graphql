import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GlobalProvider } from './context/GlobalState';

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
          <App />
        </Router>
      </GlobalProvider>
    </Provider>
  </React.StrictMode>
)
