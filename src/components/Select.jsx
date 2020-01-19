import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputBase from '@material-ui/core/InputBase'
import StarBorder from '@material-ui/icons/StarBorder'
import Box from '@material-ui/core/Box'

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    width: 200,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase)

export const SelectCurrency = ({
  value,
  onChange,
  favoriteAction,
  currencyList = []
}) => (
  <div>
    <FormControl>
      <InputLabel id=''>Currency</InputLabel>

      <Select
        labelId=''
        id=''
        value={value}
        onChange={onChange}
        input={<BootstrapInput />}
      >
        {currencyList.map((currency) => (
          <MenuItem key={currency.code} value={currency.code}>
            {currency.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Box onClick={favoriteAction} component='span' pt={20}>
      <StarBorder />
    </Box>
    {/* <span onClick={favoriteAction} pt={20}>
      <StarBorder />
    </span> */}
  </div>
)
