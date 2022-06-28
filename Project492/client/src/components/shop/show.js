import React ,{useEffect}from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../../config/axios'

export default function Show() {

    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state.order

    useEffect(()=>{

      console.log(order);
  
    },[order])

  return (
    <div>Shop Show</div>
  )
}
