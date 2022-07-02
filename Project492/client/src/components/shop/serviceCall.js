import React, { useEffect,useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import Header from '../customer/components/Header'
import axios from '../../config/axios'
import socket from '../../config/socket'
import { ACCEPT_REQUEST, WAITING_REQUEST } from '../../config/data'

export default function ServiceCall({setHold}) {

    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state.order
    const [show, setShow] = useState(false)
    // const [press, setPress] = useState(false)

    // useEffect(()=>{
    //   // console.log(order);
    //   // setCheck(true)

    //   // reconnect socket
    //   // socket.io.reconnect()

    // },[press])


    const accept = async(e)=>{
      try {
          e.preventDefault()
          const check  = window.confirm('Accept ?!!')
          if(!check) return ;

          const result = await axios.put(`/order/${order.id}`)
        //   console.log(result);
          if(result.data.message === 'taken') {
            alert('Taken')  
            return navigate('/home');
          }

          const data = {
              order_id : order.id,
              accept : true
          }
          // socket.reconnect()
          socket.connect()
          // setMode(ACCEPT_REQUEST)
          
          //   console.log(order);
          
          await socket.emit('matching-user', order.id)
          await socket.emit('accept-order', order.id)

          return navigate('/shop-waiting', {state : {order : order}})
          
        } catch (error) {
            console.error(error)
        }
    }
    
    
    const reject = async(e)=>{
        try {
          e.preventDefault()
          const check  = window.confirm('Reject ?!!')
          if(!check) return ;

            const data = {
                order_id : order.id,
                accept : false
            }
            
            socket.connect()
            // setMode(WAITING_REQUEST)

            setHold(null)
            

          await socket.emit('accept-order', data)

          return navigate('/home')
          
      } catch (error) {
          console.error(error)
      }
  }

  const map = async(e) => {
      try {
          e.preventDefault()

          // return navigate('map')

      } catch (error) {
          
      }
  }
    // const see = async(e) => {
    //   try {
    //     e.preventDefault()

    //     return navigate('/shop-confirm', {state : {order : order}})

    //   } catch (error) {
    //     console.error(error)
    //   }
    // }

    let content = (
        <>
          <h1>There is <br></br> a service call</h1>
          <button type='submit' onClick={(e)=>setShow(true)} ><strong>detail</strong></button>
        </>
    )

      if(show){
        content = (
          <>
            {order && (
            <div className='shop-order'>
                    <div className=' shop-order-title'>
                        <h1>Problem : </h1>
                        <h1>{order.problem}</h1>
                    </div>
                    <div className=' shop-order-title'>
                        <h1>Brand : </h1>
                        <h1>{order.brand}</h1>
                    </div>
                    <div className=' shop-order-title'>
                        <h1>Model : </h1>
                        <h1>{order.model}</h1>
                    </div>
                    
                    {order.description && (
                        <div className='shop-order-description'>
                            <p>{order.description}</p>
                        </div>
                    )}

                    {order.Ophotos.length!==0 && (
                        <div className='shop-order-photo'>
                            {order.Ophotos.map(photo => (
                                <img 
                                    src={photo}
                                    alt='order'
                                />
                            ))}
                        </div>
                    )}

                    <button type='button' onClick={(e)=>map(e)}><strong>Map</strong></button>

                    <div className='shop-order-button'>
                        <button type='submit' onClick={e=>accept(e)} ><strong>Accept</strong></button>
                        <button type='button' onClick={(e => reject(e))} ><strong>Reject</strong></button>
                    </div>
            </div>
        )}
          </>
        )
      }

  return (
    <div className='shop-service-call'>
        <Header />
        {content}
    </div>
  )
}
