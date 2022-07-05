import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDontFound, blockGetDogs } from '../redux/actions/actions.js';
import dog404 from '../images/404.png'
import './NotFound.css'

function NotFound() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setDontFound())
    dispatch(blockGetDogs("off"))
  }, [])
  return (
    <div className='msg404'>
      <div>
        <img src={dog404} />
        <h1>404</h1>
      </div>
    </div>
  )
}

export default NotFound