import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Loader(props) {
  return (
    <div>
      <CircularProgress
        variant='indeterminate'
        disableShrink
        size={24}
        thickness={4}
        {...props}
      />{' '}
    </div>
  )
}
