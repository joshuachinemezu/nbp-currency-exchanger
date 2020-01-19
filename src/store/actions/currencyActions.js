import { fetchCurrencies, fetchCurrencyRate } from '../../api/requests'

import {
  FETCH_CURRENCY,
  HANDEL_ERROR,
  FETCH_CURRENCY_RATE,
  IS_LOADING_CURRENCY_RATE,
  CURRENCY_START_DATE_CHANGED,
  // CURRENCY_END_DATE_CHANGED,
  ACTIVE_CURRENCY
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
 * @description Action responsible for start date change
 * @param payload
 * @returns {Function}
 *
 */
export const endDateChange = (payload) => async (dispatch) => {
  // dispatch({
  //   type: CURRENCY_END_DATE_CHANGED,
  //   payload: payload
  // })
  return await getCurrencyRate()
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
