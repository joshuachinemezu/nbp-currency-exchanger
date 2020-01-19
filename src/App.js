import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Currency from './containers/Currency'

const App = () => (
  <Provider store={store}>
    <Currency />
  </Provider>
)

export default App
