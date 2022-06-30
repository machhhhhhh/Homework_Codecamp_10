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

function Home({user,reload,check}) {

  const navigate = useNavigate()

  const [holdOrder, setHold] = useState(null)
  


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
    reload()
    // window.location.reload()
    checkOrderFinish()
    // console.log('home',user);

  },[])

  useEffect(()=>{

    // reload()
    // console.log(user);
    // reload()
      
      socket.on('get-order', data => {
        // reload()
        // console.log('socket',user);
        // console.log(data);
              // if(check === true) return ;
                if( user.isShopOn ==='YES') { // can get order
                  socket.disconnect()
                  goToServiceCall(data.order)
                  // console.log('test test test ttttt');
                      
                }
                else return;
      })
  },[socket])
  
  const goToServiceCall = (data) => {
    try {

      if(holdOrder===null) setHold(data.id)
      else if(data.id !== holdOrder) return;
      return navigate('/shop-service-call', {state : {order : data}})


    } catch (error) {
      console.error(error);
    }
  }


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