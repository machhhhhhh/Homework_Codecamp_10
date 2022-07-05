import React ,{useEffect, useState}from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../../config/axios'
import Header from '../customer/components/Header'
import '../css/shop/show.css'
import socket from '../../config/socket'

const url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'

export default function Show({setHold}) {

    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state.order
    const [see, setSee] = useState(false)
    const [press, setPress] = useState(false)
    const [comeingOrder, setOrder] = useState(null)

    // if finish setHold == null

    useEffect(()=>{

      console.log('shop',order);
  
    },[order])

    const preventFinish = async(e) => {
      try {
        e.preventDefault()
        setPress(true)
        
      } catch (error) {
        console.error(error)
      }
    }

    const finish = async(e) => {
      try {
        e.preventDefault()
        console.log('Finish');
        const result = await axios.put(`/order/finish/${order.id}`)
        console.log(result.data);
        await socket.emit('order-finish', order)
        setHold(null)
        return navigate('/home')
      } catch (error) {
        console.error(error)
      }
    }

    const seeOrder = async(e) => {
      try {
        e.preventDefault()
        setSee(true)
      } catch (error) {
        console.error(error)
      }
    }
    const back = async(e) => {
      try {
        e.preventDefault()
        setPress(false)
        setSee(false)
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

    const chat = async(e) => {
      try {
        e.preventDefault()
      } catch (error) {
        console.error(error)
      }
    }

    
    let content = (
      <>
        <div className='shop-show-customer-image'>
            <img 
              className='shop-show-customer-image-tag'
              src={order.Customer.image ? order.Customer.image : url}
              alt='profile'
              />
        </div>

        <div className='shop-show-customer-header'>

          <div className='shop-show-customer-info'>
              <h1>Name : </h1>
              <h1>{order.Customer.firstname} {order.Customer.lastname}</h1>
          </div>

          <div className='shop-show-customer-info'>
              <h1>E-mail : </h1>
              <h1>{order.Customer.username}</h1>
          </div>

          <div className='shop-show-customer-info'>
              <h1>Tel : </h1>
              <h1>{order.Customer.phone}</h1>
          </div>

        </div>

        <div className='shop-show-button-up'>
            <button className='shop-show-button-map' onClick={e => map(e)}  type='button'><strong>Map</strong></button>
            <button className='shop-show-button-chat' onClick={e => chat(e)} type='button'><strong>CHAT</strong></button>
        </div>

        <div className='shop-show-button-down'>
            <button className='shop-show-button-order' onClick={e =>seeOrder(e)} type='button'><strong>Order</strong></button>
            <button className='shop-show-button-finish' onClick={e => preventFinish(e)} type='submit'><strong>Finish</strong></button>
        </div>

      </>
    )

    if(see) {
      content = (
          <div className='shop-show-order'>
            

            <div className='shop-show-order-content'>
                
                <div className='shop-show-order-content-info'>
                    <h1>Problem : </h1>
                    <h1>{order.problem} </h1>
                </div>

                <div className='shop-show-order-content-info'>
                    <h1>Brand : </h1>
                    <h1>{order.brand} </h1>
                </div>

                <div className='shop-show-order-content-info'>
                    <h1>Model : </h1>
                    <h1>{order.model} </h1>
                </div>

            </div>

            <div className='shop-show-order-description'>
                {order.description ? (
                    <h2>
                        {order.description}
                    </h2>
                ) : (
                  <h1>No description</h1>
                )}
            </div>

            <div className='shop-show-order-photo'>
                {order.Ophotos.length!==0 ? (
                  <>

                  </>
                ) : (
                  <h1>No photo</h1>
                )}
            </div>


           <div className='shop-show-order-button'>
             <button className='shop-show-order-back' onClick={e => back(e)} type='submit'><strong>BACK</strong></button>
           </div>

          </div>
      )
    }

    if(press) {
      content = (
       <div className='shop-show-finish'>
         <h1 className='shop-show-finish-header'>Finish Order ?</h1>

        <div className='shop-show-finish-button'>
          <button className='shop-show-finish-button-yes' type='submit' onClick={e=>finish(e)} ><strong>YES</strong></button>
          <button className='shop-show-finish-button-no' type='button' onClick={(e)=>back(e)}><strong>NO</strong></button>
        </div>
       </div>
      )
    }
    

  return (
    <div className='shop-show'>
        <Header />
        {content}
        
    </div>
  )
}
