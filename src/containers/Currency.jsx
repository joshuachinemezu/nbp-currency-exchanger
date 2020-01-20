import React, { Fragment, useEffect } from 'react'

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
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import Favorite from '@material-ui/icons/Favorite'

import {
  getCurrencies,
  dateChange,
  currencyFavorite,
  favoriteDialogueChange,
  removeAllFavorite,
  removeFavorite,
  getCurrencyRate
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

function Currency() {
  const currency = useSelector((state) => state.currency)

  

  const {
    currencyFavorites,
    favoriteDialogue,
    rateToDate,
    rateFromDate,
    isRateFetched,
    activeCurrency,
    isCurrencyLoaded,
    error
  } = { ...currency }

  let currencyList = currency.currencyList.rates
  let currencyRates = currency.rate

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrencies())
    dispatch(getCurrencyRate(activeCurrency))
  }, [activeCurrency, dispatch])
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
                    value={activeCurrency}
                    onChange={(e) => dispatch(getCurrencyRate(e.target.value))}
                    currencyList={currencyList}
                  />
                  <Box component='span' pt={20}>
                    {currencyFavorites.includes(activeCurrency) ? (
                      <Favorite
                        onClick={() => dispatch(currencyFavorite())}
                        style={{ cursor: 'pointer', color: red[700] }}
                      />
                    ) : (
                      <Favorite
                        color='disabled'
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatch(currencyFavorite())}
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
                      dispatch(dateChange({ startDate, endDate }))
                    }
                    // onChangeStartDate={onChangeStartDate}
                    // onChangeEndDate={onChangeEndDate}
                    focusedInput={null}
                  />
                </Paper>
              </Grid>
            </Grid>

            <Box mx='auto' bgcolor='background.paper' mt={10} p={1}>
              <StickyHeadTable
                data={currencyRates.rates}
                currency={activeCurrency}
              />
            </Box>

            <FloatingActionButtonZoom
              showModal={() => dispatch(favoriteDialogueChange(true))}
            />
            <FullScreenDialog
              favorites={currencyFavorites}
              removeFavorite={(currency) => dispatch(removeFavorite(currency))}
              removeAllFavorite={() => dispatch(removeAllFavorite())}
              open={favoriteDialogue}
              handleClickOpen={() => dispatch(favoriteDialogueChange(true))}
              handleClose={() => dispatch(favoriteDialogueChange(false))}
            />
          </AppWrapper>
        )}
      </Fragment>
    </Container>
  )
}

export default Currency
