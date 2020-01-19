import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import moment from 'moment'

const initialState = {
  currency: {
    currencyList: {
      data: {},
      error: ''
    },
    rate: {
      data: {},
      error: ''
    },
    activeCurrency: 'EUR',
    isCurrencyLoaded: false,
    isRateFetched: false,
    rateFromDate: moment().subtract(3, 'days'),
    rateToDate: moment().subtract(2, 'days'),
    currencyFavorites: JSON.parse(localStorage.getItem('favorites')) || [],
    favoriteDialogue: false
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
