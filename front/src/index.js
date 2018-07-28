import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'

import registerServiceWorker from './registerServiceWorker'

import { store, theme } from './config'
import './index.css'
import App from './App'

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
