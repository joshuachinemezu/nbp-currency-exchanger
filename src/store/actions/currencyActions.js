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

import * as moment from 'moment'

const YESTERDAY = moment()
  .subtract(2, 'days')
  .format('YYYY-MM-DD')
const TODAY = moment()
  .subtract(1, 'days')
  .format('YYYY-MM-DD')

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
 * @returns {Function}
 */
export const getCurrencies = (fromDate = YESTERDAY, toDate = TODAY) => async (
  dispatch
) => {
  try {
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

/**
 * @param payload
 * @returns {Function}
 */
// export const dateChange = (payload) => async (dispatch) => {
//   dispatch({
//     type: CURRENCY_DATE_CHANGED,
//     payload: true
//   })
//   fetchCurrencyRate(payload)
//     .then((res) => {
//       dispatch({
//         type: CURRENCY_CHANGE,
//         payload: res.data
//       })
//     })
//     .catch((error) => {
//       dispatch(handleError(error))
//     })
// }
