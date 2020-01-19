import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { GlobalStyle, AppWrapper, Error, Loading } from '../components/styles'
import { SelectCurrency } from '../components/Select'
import DateRangePickerWrapper from '../components/DatePicker'
import FullScreenDialog from '../components/Dialogue'
import FloatingActionButtonZoom from '../components/FloatingActionButton'
import StickyHeadTable from '../components/Table'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import {
  getCurrencyRate,
  getCurrencies,
  startDateChange,
  endDateChange,
  currencyChange,
  currencyFavorite,
  favoriteDialogueChange,
  removeFavorite
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
  removeFavorite
}) {
  useEffect(() => {
    getCurrencies()
    getCurrencyRate(currentCurrency)
  }, [currentCurrency, getCurrencies, getCurrencyRate])
  const classes = useStyles()

  return (
    <Fragment>
      <CssBaseline />
      <Container>
        <GlobalStyle />
        {error && <Error>{error.message}</Error>}
        {!isCurrencyLoaded ||
          (!isRateFetched && !error && <Loading>Loading...</Loading>)}
        {isCurrencyLoaded && isRateFetched && (
          <AppWrapper>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <Paper className={classes.paper}>
                  <SelectCurrency
                    value={currentCurrency}
                    onChange={(e) => currencyChange(e.target.value)}
                    favoriteAction={(e) => favoriteAction(e.target.value)}
                    currencyList={currencyList}
                  />
                </Paper>
              </Grid>
              <Grid item md={6}>
                <Paper className={classes.paper}>
                  <label>Date Range</label>

                  <DateRangePickerWrapper
                    initialStartDate={rateFromDate}
                    startDate={rateFromDate}
                    endDate={rateToDate}
                    startDateId='your_unique_st2342342art_date_id'
                    initialEndDate={rateToDate}
                    endDateId='your_unique_end_dedd3423date_id'
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
              open={favoriteDialogue}
              handleClickOpen={(e) => dialogueOpen(e.target.value)}
              handleClose={(e) => dialogueClose(e.target.value)}
            />
          </AppWrapper>
        )}
      </Container>
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Currency)
