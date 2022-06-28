import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import io from 'socket.io-client'
import Header from '../customer/components/Header'
import axios from '../../config/axios'

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


    useEffect(()=>{

      socket.on('show-order', data => {

        console.log(data);

          if(data.select===true) return navigate('/shop-show', {state : {order : order}})
          else if (data.select===false)return navigate('/home')
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