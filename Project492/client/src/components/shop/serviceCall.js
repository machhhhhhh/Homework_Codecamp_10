import React, { useEffect,useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import Header from '../customer/components/Header'
import axios from '../../config/axios'
import socket from '../../config/socket'
import { ACCEPT_REQUEST, WAITING_REQUEST } from '../../config/data'
import '../css/shop/serviceCall.css'

export default function ServiceCall({setHold}) {

    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state.order
    const [show, setShow] = useState(false)
    const [preventAccept, setPreventAccept] = useState(false)
    const [preventReject, setPreventReject] = useState(false)

    // const [press, setPress] = useState(false)

    // useEffect(()=>{
    //   // console.log(order);
    //   // setCheck(true)

    //   // reconnect socket
    //   // socket.io.reconnect()

    // },[press])

    const checkAccept = async(e) => {
      try {
        e.preventDefault()
        setShow(false)
        setPreventAccept(true)
      } catch (error) {
        console.error(error)
      }
    }

    const checkReject = async(e) => {
      try {
        e.preventDefault()
        setShow(false)
        setPreventReject(true)
      } catch (error) {
        console.error(error)
      }
    }


    const accept = async(e)=>{
      try {
          e.preventDefault()
          // const check  = window.confirm('Accept ?!!')
          // if(!check) return ;

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

          // console.log(result.data.data);
          
          //   console.log(order);
          
          await socket.emit('matching-user', order.id)
          await socket.emit('accept-order', result.data.data)

          return navigate('/shop-waiting', {state : {order : order}})
          
        } catch (error) {
            console.error(error)
        }
    }
    
    
    const reject = async(e)=>{
        try {
          e.preventDefault()
          // const check  = window.confirm('Reject ?!!')
          // if(!check) return ;

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

  const back = async(e) => {
    try {
      e.preventDefault()
      // console.log('test back');
      setShow(true)
      setPreventAccept(false)
      setPreventReject(false)
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
        <div className='shop-service-noti'>
          <h1 className='shop-service-noti-tag'>
            There is <br></br> 
            a service call
          </h1>
          <button className='shop-service-noti-button' type='submit' onClick={(e)=>setShow(true)} ><strong>detail</strong></button>
        </div>
    )

      if(show){
        content = (
          <div className='shop-service-call'>
            {order && (
            <div className='shop-order'>
                    <div className=' shop-order-title'>
                        <h1>Problem : </h1>
                        <h1 className='shop-order-title-problem'>{order.problem}</h1>
                    </div>
                    <div className=' shop-order-title'>
                        <h1>Brand : </h1>
                        <h1 className='shop-order-title-detail'>{order.brand}</h1>
                    </div>
                    <div className=' shop-order-title'>
                        <h1>Model : </h1>
                        <h1 className='shop-order-title-detail'>{order.model}</h1>
                    </div>
                    
                    <div className='shop-order-description'>
                      {order.description ? (
                              <p>{order.description}</p>
                      )
                      : <p>No Description</p>
                      }
                        </div>

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

                    {order.Ophotos.length===0 && (
                      <div className='shop-order-no-photo'>
                        <p >No Photo</p>
                      </div>
                    )}

                    <button className='shop-service-map' type='button' onClick={(e)=>map(e)}><strong>Map</strong></button>

                    <div className='shop-service-button'>
                        <button className='shop-service-button-accept' type='submit' onClick={e=>checkAccept(e)} ><strong>Accept</strong></button>
                        <button className='shop-service-button-reject' type='button' onClick={e => checkReject(e)} ><strong>Reject</strong></button>
                    </div>
            </div>
        )}
        </div>
        )
      }

      if(preventAccept) {
        content = (

          <div className='shop-service-prevent'>
            <h1 className='shop-service-prevent-tag' >Accept ??</h1>
            <div className='shop-service-button'>
              <button className='shop-service-button-accept' type='submit' onClick={e=>accept(e)} ><strong>Accept</strong></button>
              <button className='shop-service-button-reject' type='button' onClick={e => back(e)} ><strong>BACK</strong></button>
          </div>
          </div>
        )
      }

      if(preventReject) {
        content = (
          <div className='shop-service-prevent'>
            <h1 className='shop-service-prevent-tag' >Reject ??</h1>
            <div className='shop-service-button'>
              <button className='shop-service-button-accept' type='submit' onClick={e=>reject(e)} ><strong>Reject</strong></button>
              <button className='shop-service-button-reject' type='button' onClick={e => back(e)} ><strong>BACK</strong></button>
            </div>
          </div>
        )
      }

  return (
    <>
        <Header />
        {content}
    </>
  )
}
