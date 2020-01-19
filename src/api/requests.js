import axios from 'axios'

// Node API KEY
const EXCHANGER_API_URL = process.env.REACT_APP_EXCHANGER_API_URL
const DESIRED_TABLE = 'c'

/**
 *
 * @param fromDate
 * @param toDate
 * @returns {Promise<AxiosResponse<T>>}
 */
export function fetchCurrencies(fromDate, toDate) {
  const url = `${EXCHANGER_API_URL}/tables/${DESIRED_TABLE}/${fromDate}/${toDate}/?format=json`
  return axios.get(url)
}

/**
 *
 * @param currency
 * @param fromDate
 * @param toDate
 * @returns {Promise<AxiosResponse<T>>}
 */
export function fetchCurrencyRate(currency, fromDate, toDate) {
  const url = `${EXCHANGER_API_URL}/rates/${DESIRED_TABLE}/${currency}/${fromDate}/${toDate}?format=json`
  return axios.get(url)
}
