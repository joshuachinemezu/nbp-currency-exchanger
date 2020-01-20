import React from 'react'
import { mount } from 'enzyme'
import FloatingActionButton from '../components/FloatingActionButton'

describe('<FloatingActionButton /> with props', () => {
  const initialProps = {
    favorites: ['CHF', 'AUD', 'USD'],
    open: false
  }

  const wrapper = mount(<FloatingActionButton {...initialProps} />)

  it('allows us to set props', () => {})
})
