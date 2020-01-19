import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { GlobalStyle, AppWrapper, Error, Loading } from '../styles'
import { Select } from '../Select'
import DateRangePickerWrapper from '../DatePicker'

import {
  getCurrencyRate,
  getCurrencies,
  startDateChange,
  endDateChange,
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
  isRateFetched,
  rateFromDate,
  rateToDate,
  onFocusChange,
  onChangeStartDate,
  onChangeEndDate
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

          <DateRangePickerWrapper
            initialStartDate={rateFromDate}
            startDate={rateFromDate}
            endDate={rateToDate}
            startDateId='your_unique_st2342342art_date_id'
            initialEndDate={rateToDate}
            endDateId='your_unique_end_dedd3423date_id'
            // stateDateWrapper={({ startDate, endDate }) =>
            //   dateChange({ startDate, endDate })
            // }
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
            focusedInput={null}
            onFocusChange={(focusedInput) => onFocusChange({ focusedInput })}
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
  onChangeStartDate: (payload) => {
    dispatch(startDateChange(payload))
  },
  onChangeEndDate: (payload) => {
    dispatch(endDateChange(payload))
  },
  onFocusChange: (payload) => {
    alert('de')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Currency)
