import React from 'react'
import { Provider } from 'react-redux'
import moment from 'moment'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom/extend-expect'
import Currency from '../containers/Currency'
import Button from '@material-ui/core/Button'

const mockStore = configureStore([])

describe('<Currency/> Component with hooks', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      currency: {
        currencyList: {
          rates: {},
          error: ''
        },
        rate: {
          data: {},
          error: ''
        },
        activeCurrency: 'EUR',
        isCurrencyLoaded: false,
        isRateFetched: false,
        rateFromDate: moment().subtract(3, 'days'),
        rateToDate: moment().subtract(2, 'days'),
        currencyFavorites: JSON.parse(localStorage.getItem('favorites')) || [],
        favoriteDialogue: false
      }
    })
    component = shallow(
      <Provider store={store}>
        <Currency />
      </Provider>
    )
  })

  it('should not have button', () => {
    expect(component.contains(<Button />)).toBe(false)
  })
})
