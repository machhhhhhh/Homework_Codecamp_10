import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from '../../../config/axios'
import Header from '../../customer/components/Header'
import '../../css/customer/show.css'
import socket from '../../../config/socket'

const url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'

function Show() {

  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state.order

  // useEffect(()=>{

  //   console.log('customer',order);

  // },[order])

  useEffect(()=>{
    socket.on('redirect-customer', data => {
      // console.log(data);
      if(data.id === order.id) navigate('/index')
    })
  },[socket])


  const chat = async(e) => {
    try {
      e.preventDefault()

    } catch (error) {
      console.error(error)
    }
  }

  const map = async(e) => {
    try {
      e.preventDefault()

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className='customer-show'>
      <Header />
      
      <div className='customer-show-shop-image'>
        <img 
          className='customer-show-shop-photo'
          src={order.Shop.image ? order.Shop.image : url}
          alt='profile'
        />
      </div>

      {order.Shop && (
        <div className='customer-show-shop-detail'>

          <div className='customer-show-shop-detail-title'>
            <h1>Shop : </h1>
            <h1>{order.Shop.shopname}</h1>
          </div>  

          <div className='customer-show-shop-detail-title'>
            <h1>Name : </h1>
            <h1>{order.Shop.firstname} {order.Shop.lastname}</h1>
          </div>  

          <div className='customer-show-shop-detail-title'>
            <h1>Tel : </h1>
            <h1>{order.Shop.phone}</h1>
          </div>  

      </div>
      )}

      <div className='customer-show-button'>
        <button className='customer-show-button-map' onClick={e => map(e)} type='button'><strong>Map</strong></button>
        <button className='customer-show-button-chat'  onClick={e => chat(e)} type='button'><strong>CHAT</strong></button>
      </div>

    </div>
  )
}

export default Show