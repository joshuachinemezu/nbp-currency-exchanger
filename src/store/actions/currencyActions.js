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
 * @description Action responsible for start date change
 * @param payload
 * @returns {Function}
 *
 */
export const startDateChange = (payload) => async (dispatch) => {
  dispatch({
    type: CURRENCY_START_DATE_CHANGED,
    payload: payload
  })
  getCurrencyRate()
}

/**
 * @description Action responsible for end date change
 * @param payload
 * @returns {Function}
 *
 */
export const endDateChange = (payload) => async (dispatch) => {
  dispatch({
    type: CURRENCY_END_DATE_CHANGED,
    payload: payload
  })
  getCurrencyRate()
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
 * @description Action responsible for active currency change
 * @param payload
 * @returns {Function}
 */
export const currencyChange = (payload) => async (dispatch) => {
  dispatch({
    type: ACTIVE_CURRENCY,
    payload: payload
  })
  getCurrencyRate()
}

/**
 *
 * @description Action responsible for fetching all available currencies
 * @returns {Function}
 */
export const getCurrencies = () => async (dispatch, getState) => {
  try {
    const fromDate = getState().currency.rateFromDate.format('YYYY-MM-DD')
    const toDate = getState().currency.rateToDate.format('YYYY-MM-DD')
    const { data } = await fetchCurrencies(fromDate, toDate)
    dispatch({
      type: FETCH_CURRENCY,
      payload: data[0]
    })
  } catch (error) {
    dispatch(handleError(error))
  }
}

/**
 * @description Action responsible for fetching rates of active currency
 * @returns {Function}
 */
export const getCurrencyRate = () => async (dispatch, getState) => {
  try {
    let currency = getState().currency.activeCurrency
    let fromDate = getState().currency.rateFromDate.format('YYYY-MM-DD')
    let toDate = getState().currency.rateToDate.format('YYYY-MM-DD')

    if (fromDate == null && toDate == null) return null
    dispatch({
      type: IS_LOADING_CURRENCY_RATE,
      payload: true
    })
    const { data } = await fetchCurrencyRate(currency, fromDate, toDate)
    dispatch({
      type: FETCH_CURRENCY_RATE,
      payload: data
    })
  } catch (error) {
    dispatch(handleError(error))
  }
}
