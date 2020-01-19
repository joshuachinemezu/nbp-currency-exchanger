import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { GlobalStyle, AppWrapper, Error, Loading } from '../styles'
import { Select } from '../Select'

import {
  getCurrencyRate,
  getCurrencies,
  currencyChange
} from '../../store/actions/currencyActions'

function Currency({
  error,
  isCurrencyLoaded,
  getCurrencyRate,
  getCurrencies,
  currencyList,
  currentCurrency,
  currencyChange,
  currencyRates,
  isRateFetched
}) {
  useEffect(() => {
    getCurrencies()
    getCurrencyRate(currentCurrency)
  }, [currentCurrency, getCurrencies, getCurrencyRate])

  return (
    <Fragment>
      <GlobalStyle />
      {error && <Error>{error.message}</Error>}
      {!isCurrencyLoaded ||
        (!isRateFetched && !error && <Loading>Loading...</Loading>)}
      {isCurrencyLoaded && isRateFetched && (
        <AppWrapper>
          {/* <div>{JSON.stringify(currencyRates)}</div> */}
          <Select
            value={currentCurrency}
            onChange={(e) => currencyChange(e.target.value)}
            currencyList={currencyList}
          />


          <div>
            {currencyRates.map((rate) => (
              <ul>
                <p key={rate.bid}> Buy: {rate.bid}</p>
                <p key={rate.ask}>Sell: {rate.ask}</p>
              </ul>
            ))}
          </div>
        </AppWrapper>
      )}
    </Fragment>
  )
}

const mapStateToProps = ({ currency }) => ({
  currencyList: currency.currencyList.rates,
  currentCurrency: currency.activeCurrency,
  isCurrencyLoaded: currency.isCurrencyLoaded,
  currencyRates: currency.rate.rates,
  rateFromDate: currency.rateFromDate,
  rateToDate: currency.rateToDate,
  error: currency.error,
  isRateFetched: currency.isRateFetched
})

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => {
    dispatch(getCurrencies())
  },
  getCurrencyRate: (currency) => {
    dispatch(getCurrencyRate())
  },
  currencyChange: (payload) => {
    dispatch(currencyChange(payload))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Currency)
