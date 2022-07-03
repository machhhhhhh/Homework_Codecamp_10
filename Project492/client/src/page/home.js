import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/css/shop/home.css'
import axios from '../config/axios'
import { WAITING_REQUEST, ACCEPT_REQUEST, HOLD_REQUEST } from '../config/data'
import socket from '../config/socket'

function Home({user,reload,holdOrder, setHold}) {

  const navigate = useNavigate()
  const [index, setIndex] = useState(null)

  useEffect(()=>{
    console.log(index);
  },[index])

  useEffect(()=>{

    const checkOrder = async() => {
      try {
        const result = await axios.get('/order')
        // if(result.data.order===null) return ;
        // if(!id) setId(result.data.id)
        // if(!result)
        // console.log(result.data);
        // if(id===result.data.id) return ;
        console.log(result.data);
        for(let i=0; i<result.data.length; i++){
            setIndex(item => [...item, i])
        }

        // console.log(index);

        // if(result.data) {
        //   if(id === result.data.id) return;

        //   id = result.data.id
          return navigate('/shop-service-call', {state : {order : result.data}})
        // }
        
        

      } catch (error) {
        console.error(error)
      }
    }
    
    const checkOrderFinish = async() => {
      try {

        const result = await axios.get('/order/check')
        const order = result.data
        // console.log(order);
        if(!order) return ;

        const check = result.data.check
        if(check === false) {
          return navigate('/shop-waiting', {state : { order : order}})
        }

        // setMode(ACCEPT_REQUEST)

        return navigate('/shop-show', {state : { order : order}})
        
      } catch (error) {
        console.error(error)
      }
    }

    // setMode(WAITING_REQUEST)

    // const token = LocalStorageService.getToken()
    // console.log(token);

    // if(!user) reload()
    // reload()
    // window.location.reload()
    // checkOrder()
    checkOrderFinish()
    // console.log('home',user);

    //----------- if have order setPress(false)

    // reconnecttion socket
    console.log(user);
    // if(!user) reload()

  },[])

  
    useEffect(()=>{

      // reload()
      // console.log(user);
      // reload()
      

        socket.on('get-order', data => {
          // reload()
          // console.log('socket',user);
          // console.log(data);
          // if (mode === WAITING_REQUEST) {
                // if(check === true) return ;
                    if( user.isShopOn ==='YES') { // can get order
                      socket.disconnect()
                      // setPress(false)
                      // setMode(HOLD_REQUEST)
                      goToServiceCall(data.order)
                      // console.log('test test test ttttt');
                          
                    }
                    else return;
                // }
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