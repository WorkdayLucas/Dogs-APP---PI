import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'

import App from '../App'
import Nav from '../components/Home.jsx'

test("render nav", ()=>{

    const component = render(<Nav/>) 

    component.getByText("Dogs")

})

