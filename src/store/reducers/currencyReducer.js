import {
  FETCH_CURRENCY,
  HANDEL_ERROR,
  FETCH_CURRENCY_RATE,
  ACTIVE_CURRENCY,
  IS_LOADING_CURRENCY_RATE,
  CURRENCY_START_DATE_CHANGED,
  CURRENCY_END_DATE_CHANGED
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
    case CURRENCY_START_DATE_CHANGED:
      return {
        ...state,
        rateFromDate: payload
      }
    case CURRENCY_END_DATE_CHANGED:
      return {
        ...state,
        rateToDate: payload
      }

    default:
      return state || {}
  }
}
