import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import Header from '../customer/components/Header'
// import axios from '../../config/axios'
// import jwtDecode from 'jwt-decode'
import socket from '../../config/socket'
import '../css/shop/waiting.css'

function Waiting() {

    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state.order
    // const shopid = jwtDecode(token)

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
    <div className='shop-waiting'>
      <Header />
      
      <div className='shop-waiting-title'>
        <h1 className='shop-waiting-content'>
          Please <br></br>
          wait for <br></br>
          customer <br></br>
          confirmed
        </h1>
      </div>

    </div>
  )
}

export default Waiting