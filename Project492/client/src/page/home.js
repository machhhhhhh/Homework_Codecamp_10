import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/css/shop/home.css'
import io from 'socket.io-client'
import axios from '../config/axios'
import LocalStorageService from '../service/LocalStorageService'

const socket = io.connect('http://localhost:5000', {
    transports : ['websocket'], 
    withCredentials: true,
    extraHeaders: {
    "my-custom-header": "abcd"
    }})

function Home({user,reload}) {

  const navigate = useNavigate()
  


  useEffect(()=>{
    
    const checkOrderFinish = async() => {
      try {

        const result = await axios.get('/order/check')
        const order = result.data
        // console.log(order);
        if(!order) return ;
        return navigate('/shop-show', {state : { order : order}})
        
      } catch (error) {
        console.error(error)
      }
    }

    // const token = LocalStorageService.getToken()
    // console.log(token);

    // if(!user) reload()
    // reload()
    // checkOrderFinish()
    // console.log('home',user);
  },[])

  useEffect(()=>{

    // reload()
    // console.log(user);
    // reload()
    socket.on('get-order', data => {
      // reload()
      // console.log('socket',user);
              if(user.isShopOn ==='YES') { // can get order
                    return navigate('/shop-service-call', {state : {order : data.order}})
              }
              else return;
            })
  },[socket])
  


  const getStart = async(e) => {
    try {
      e.preventDefault()
      return navigate('/shop-profile')
      
    } catch (error) {
      console.error(error)
    }
  }

  const history = async(e) => {
    try {
      e.preventDefault()
      return navigate('/shop-history')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='shop-home'>

      <div className='shop-home-logo'>
          <img 
              className='shop-home-logo-image'
              src='https://res.cloudinary.com/drnmadwqu/image/upload/v1655873717/logo_vd9prv.png' 
              alt='app-logo'
            />
      </div>

      
        <button className='shop-home-start' type='button' onClick={e=>getStart(e)} ><strong>Get Start</strong></button>
        <button className='shop-home-history' type='button' onClick={e => history(e)} ><strong>History</strong></button>
          
    </div>
  )
}

export default Home