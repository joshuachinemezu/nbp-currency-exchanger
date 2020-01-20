import React from 'react'
import { mount } from 'enzyme'
import FullScreenDialog from '../components/Dialogue'

describe('<FullScreenDialog /> with props', () => {
  const initialProps = {
    favorites: ['CHF', 'AUD', 'USD'],
    open: false
  }

  const container = mount(<FullScreenDialog {...initialProps} />)

  it('should call the dispatch function on button click', () => {
    // expect(initialProps.dispatch).toHaveBeenCalledTimes(1)
  })
})
