import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from '../../../config/axios'

function Show() {

  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state.order

  return (
    <div>Customer Show</div>
  )
}

export default Show