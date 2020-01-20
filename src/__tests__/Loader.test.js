import React from 'react'
import { shallow } from 'enzyme'
import Loader from '../components/Loader'

it('renders without crashing', () => {
  shallow(<Loader />)
})
