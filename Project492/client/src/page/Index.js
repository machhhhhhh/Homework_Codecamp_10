import React, { useEffect } from 'react'
import {Avatar} from '@mui/material'
import '../components/css/customer/index.css'
import {useNavigate} from 'react-router-dom'
import  axios  from '../config/axios'

function Index({logout,user,reload}) {

  const navigate = useNavigate()

  // ใช้ useEffect ทำการ fetchOrder ถ้ามีส่งเข้า Order Waiting Page
  useEffect(()=>{

    const checkOrder = async() => {
      try {
        
        const result = await axios.get('/order/customer')
        // console.log(result.data);

        // null = shop has take
        // false = can add order
        // true = waiting for shop

        if(result.data.check){
          return navigate('/order-waiting', {state : {order : result.data.order}})
        }

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

        return navigate('/customer-show', {state : { order : order}})
      } catch (error) {
        console.error(error)
      }
    }

    // reload()
    // console.log(user);
    checkOrder()

    checkOrderFinish()

  },[])


  const profile = async(e) => {
    try {

      e.preventDefault()

      return navigate('/customer-profile')
      
    } catch (error) {
      console.error(error)
    }
  }

  const getStart = async(e) => {
    try {
      e.preventDefault()
      return navigate('/order')
      
    } catch (error) {
      console.error(error)
    }
  }

  const map = async(e) => {
    try {
      e.preventDefault()
      return navigate('/customer-map')
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='customer-index'>
        
          <div className='customer-index-avatar' onClick={e=>profile(e)}>
            <h1></h1>
            <Avatar src={user && user.image } className='customer-index-avatar-image'  />
          </div>

        <div className='customer-index-logo'>
          <img 
              className='customer-index-logo-image'
              src='https://res.cloudinary.com/drnmadwqu/image/upload/v1655873717/logo_vd9prv.png' 
              alt='app-logo'
            />
        </div>

        <button type='button' className='customer-index-start' onClick={(e)=>getStart(e)}><strong>Get Start</strong></button>
        <button type='button' className='customer-index-map' onClick={(e)=>map(e)} ><strong>Map</strong></button>

    </div>
  )
}

export default Index