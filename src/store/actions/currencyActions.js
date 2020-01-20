import { fetchCurrencies, fetchCurrencyRate } from '../../api/requests'

import {
  FETCH_CURRENCY,
  HANDEL_ERROR,
  FETCH_CURRENCY_RATE,
  IS_LOADING_CURRENCY_RATE,
  CURRENCY_START_DATE_CHANGED,
  CURRENCY_FAVORITES,
  CURRENCY_END_DATE_CHANGED,
  ACTIVE_CURRENCY,
  CURRENCY_FAVORITE_DIALOGUE
} from './types'

/**
 * @description Action responsible for error handling
 * @param payload
 * @returns {{type: string, payload: *}}
 */
const handleError = (payload) => ({
  type: HANDEL_ERROR,
  payload
})

/**
 * @description Action responsible for changing favorite dialogue
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const favoriteDialogueChange = (payload) => ({
  type: CURRENCY_FAVORITE_DIALOGUE,
  payload
})

/**
 * @description Action responsible for  date change
 * @param payload
 * @returns {Function}
 *
 */
export const dateChange = (payload) => async (dispatch, getState) => {
  dispatch({
    type: CURRENCY_START_DATE_CHANGED,
    payload: payload.startDate
  })
  dispatch({
    type: CURRENCY_END_DATE_CHANGED,
    payload: payload.endDate
  })

  if (payload.startDate != null && payload.endDate != null)
    dispatch(getCurrencyRate(getState().currency.activeCurrency))
}

/**
 * @description Action responsible for adding and removing currency favorites
 * @returns {Function}
 *
 */
export const currencyFavorite = () => async (dispatch, getState) => {
  var storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
  let currency = getState().currency.activeCurrency

  // Remove currency if exists or add to favorites if it does not exit
  var index = storedFavorites.indexOf(currency)
  if (index !== -1) storedFavorites.splice(index, 1)
  else storedFavorites.push(currency)

  localStorage.setItem('favorites', JSON.stringify(storedFavorites))

  dispatch({
    type: CURRENCY_FAVORITES,
    payload: storedFavorites
  })
}

/**
 * @description Action responsible for removing currency favorites
 * @param currency
 * @returns {Function}
 *
 */
export const removeFavorite = (currency) => async (dispatch) => {
  var storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
  // Remove currency if exists
  if (storedFavorites.includes(currency)) {
    var index = storedFavorites.indexOf(currency)
    if (index !== -1) storedFavorites.splice(index, 1)
  } else storedFavorites.push(currency)

  localStorage.setItem('favorites', JSON.stringify(storedFavorites))

  dispatch({
    type: CURRENCY_FAVORITES,
    payload: storedFavorites
  })
}

/**
 * @description Action responsible for removing all currency favorites
 * @returns {Function}
 *
 */
export const removeAllFavorite = () => async (dispatch) => {
  var storedFavorites = []

  localStorage.setItem('favorites', JSON.stringify(storedFavorites))

  dispatch({
    type: CURRENCY_FAVORITES,
    payload: storedFavorites
  })
}

/**
 *
 * @description Action responsible for fetching all available currencies
 * @returns {Function}
 */
export function getCurrencies() {
  return function action(dispatch, getState) {
    const fromDate = getState().currency.rateFromDate.format('YYYY-MM-DD')
    const toDate = getState().currency.rateToDate.format('YYYY-MM-DD')

    const request = fetchCurrencies(fromDate, toDate)
    return request.then(
      (response) =>
        dispatch({
          type: FETCH_CURRENCY,
          payload: response.data[0]
        }),
      (err) => dispatch(handleError(err))
    )
  }
}

/**
 * @description Action responsible for fetching rates of active currency
 * @returns {Function}
 */
export function getCurrencyRate(currency) {
  return function action(dispatch, getState) {
    dispatch({
      type: ACTIVE_CURRENCY,
      payload: currency || getState().currency.activeCurrency
    })

    let fromDate = getState().currency.rateFromDate.format('YYYY-MM-DD')
    let toDate = getState().currency.rateToDate.format('YYYY-MM-DD')

    const request = fetchCurrencyRate(currency, fromDate, toDate)

    dispatch({
      type: IS_LOADING_CURRENCY_RATE,
      payload: true
    })
    return request.then(
      (response) =>
        dispatch({
          type: FETCH_CURRENCY_RATE,
          payload: response.data
        }),
      (err) => dispatch(handleError(err))
    )
  }
}
