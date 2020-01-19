import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import * as moment from 'moment'

const initialState = {
  currency: {
    currencyList: {
      data: {},
      error: '',
      to: 0,
      from: 0
    },
    rate: {
      data: {},
      error: '',
      to: 0,
      from: 0
    },
    activeCurrency: 'EUR',
    isCurrencyLoaded: false,
    isRateFetched: false,
    rateFromDate: moment().subtract(2, 'days'),
    rateToDate: moment().subtract(1, 'days')
  }
}
const middleware = [thunk]

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(rootReducer, initialState, enhancer)

export default store
