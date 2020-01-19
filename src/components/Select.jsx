import React from 'react'

import { SelectCurrency } from './styles'

export const Select = ({ value, onChange, currencyList = [] }) => (
  <SelectCurrency value={value} onChange={onChange} name='currencyList'>
    {currencyList.map((currency) => (
      <option key={currency.code} value={currency.code}>
        {currency.code}
      </option>
    ))}
  </SelectCurrency>
)
