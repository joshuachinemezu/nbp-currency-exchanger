import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { GlobalStyle, AppWrapper, Error, Loading } from '../components/styles'
import { SelectCurrency } from '../components/Select'
import DateRangePickerWrapper from '../components/DatePicker'
import Loader from '../components/Loader'
import FullScreenDialog from '../components/Dialogue'
import FloatingActionButtonZoom from '../components/FloatingActionButton'
import StickyHeadTable from '../components/Table'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { red } from '@material-ui/core/colors'

import Favorite from '@material-ui/icons/Favorite'

import {
  getCurrencyRate,
  getCurrencies,
  startDateChange,
  endDateChange,
  currencyChange,
  currencyFavorite,
  favoriteDialogueChange,
  removeFavorite,
  removeAllFavorite
} from '../store/actions/currencyActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

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
  dateChange,
  favoriteAction,
  dialogueOpen,
  dialogueClose,
  favoriteDialogue,
  currencyFavorites,
  removeFavorite,
  removeAllFavoriteCurrency
}) {
  useEffect(() => {
    getCurrencies()
    getCurrencyRate(currentCurrency)
  }, [currentCurrency, getCurrencies, getCurrencyRate])
  const classes = useStyles()

  return (
    <Container>
      <Fragment>
        <CssBaseline />
        <GlobalStyle />
        {error && <Error>{error.message}</Error>}
        {!isCurrencyLoaded ||
          (!isRateFetched && !error && (
            <Loading>
              <Loader />
            </Loading>
          ))}
        {isCurrencyLoaded && isRateFetched && (
          <AppWrapper>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <Paper className={classes.paper}>
                  <SelectCurrency
                    value={currentCurrency}
                    onChange={(e) => currencyChange(e.target.value)}
                    currencyList={currencyList}
                  />
                  <Box component='span' pt={20}>
                    {currencyFavorites.includes(currentCurrency) ? (
                      <Favorite
                        onClick={() => favoriteAction()}
                        style={{ cursor: 'pointer', color: red[700] }}
                      />
                    ) : (
                      <Favorite
                        color='disabled'
                        style={{ cursor: 'pointer' }}
                        onClick={() => favoriteAction()}
                      />
                    )}
                  </Box>
                </Paper>
              </Grid>
              <Grid item md={6}>
                <Paper className={classes.paper}>
                  <label>Date Range</label>

                  <DateRangePickerWrapper
                    initialStartDate={rateFromDate}
                    startDate={rateFromDate}
                    endDate={rateToDate}
                    startDateId='unique_st2342342art_date_id'
                    initialEndDate={rateToDate}
                    endDateId='unique_end_dedd3423date_id'
                    onStartEndChange={({ startDate, endDate }) =>
                      dateChange({ startDate, endDate })
                    }
                    // onChangeStartDate={onChangeStartDate}
                    // onChangeEndDate={onChangeEndDate}
                    focusedInput={null}
                    onFocusChange={(focusedInput) =>
                      onFocusChange({ focusedInput })
                    }
                  />
                </Paper>
              </Grid>
            </Grid>

            <Box mx='auto' bgcolor='background.paper' mt={10} p={1}>
              <StickyHeadTable
                data={currencyRates}
                currency={currentCurrency}
              />
            </Box>

            <FloatingActionButtonZoom showModal={() => dialogueOpen()} />
            <FullScreenDialog
              favorites={currencyFavorites}
              removeFavorite={(currency) => removeFavorite(currency)}
              removeAllFavorite={() => removeAllFavoriteCurrency()}
              open={favoriteDialogue}
              handleClickOpen={(e) => dialogueOpen(e.target.value)}
              handleClose={(e) => dialogueClose(e.target.value)}
            />
          </AppWrapper>
        )}
      </Fragment>
    </Container>
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
  isRateFetched: currency.isRateFetched,
  currencyFavorites: currency.currencyFavorites,
  favoriteDialogue: currency.favoriteDialogue
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
  dateChange: (payload) => {
    dispatch(startDateChange(payload.startDate))
    dispatch(endDateChange(payload.endDate))
  },
  favoriteAction: () => {
    dispatch(currencyFavorite())
  },
  dialogueOpen: () => {
    dispatch(favoriteDialogueChange(true))
  },
  dialogueClose: () => {
    dispatch(favoriteDialogueChange(false))
  },
  removeFavorite: (currency) => {
    dispatch(removeFavorite(currency))
  },
  removeAllFavoriteCurrency: () => {
    dispatch(removeAllFavorite())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Currency)
