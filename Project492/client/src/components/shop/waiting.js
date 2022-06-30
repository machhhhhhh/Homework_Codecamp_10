import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import io from 'socket.io-client'
import Header from '../customer/components/Header'
import axios from '../../config/axios'
import jwtDecode from 'jwt-decode'
import LocalStorageService from '../../service/LocalStorageService'

const socket = io.connect('http://localhost:5000', {
    transports : ['websocket'], 
    withCredentials: true,
    extraHeaders: {
    "my-custom-header": "abcd"
    }})

function Waiting() {

    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state.order
    const token = LocalStorageService.getToken()
    const shopid = jwtDecode(token)

    // query one order where shop and accept
    // order not found ==> alert
    // 
    

    useEffect(()=>{

      socket.on('show-order', data => {

          if(data.order_id === order.id && data.select === true) return navigate('/shop-show', {state : {order : order}})

          else if (data.order_id === order.id && data.select===false) return navigate('/home')
      })

    },[socket])

    // useEffect(()=>{
    //     console.log(order);
    // },[])

  return (
    <div>Please wait for customer confirmed</div>
  )
}

export default Waiting