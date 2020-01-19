import {
  FETCH_CURRENCY,
  HANDEL_ERROR,
  FETCH_CURRENCY_RATE,
  ACTIVE_CURRENCY,
  IS_LOADING_CURRENCY_RATE
} from '../actions/types'

export default function(state, { type, payload }) {
  switch (type) {
    case FETCH_CURRENCY:
      return {
        ...state,
        currencyList: payload,
        isCurrencyLoaded: true
      }
    case FETCH_CURRENCY_RATE:
      return {
        ...state,
        rate: payload,
        isRateFetched: true
      }
    case IS_LOADING_CURRENCY_RATE:
      return {
        ...state,
        isRateFetched: !payload
      }
    case ACTIVE_CURRENCY:
      return {
        ...state,
        activeCurrency: payload
      }
    case HANDEL_ERROR:
      return {
        ...state,
        error: payload
      }

    default:
      return state || {}
  }
}
