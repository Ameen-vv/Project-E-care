import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from './redux/store/store'
import Contexts from './store/Contexts'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <Contexts>
  <App />
  </Contexts>
  </Provider>
  </React.StrictMode>
)
