import axios from '../../../config/axios'
import React, { useEffect, useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import socket from '../../../config/socket'
import Header from '../components/Header'
import '../../css/customer/waiting.css'

function Waiting() {

    const location = useLocation()
    const navigate = useNavigate()
    const order = location.state.order
    const [press, setPress] = useState(false)

    useEffect(()=>{

          socket.on('customer-decide', data => {
            console.log('data',data);
            // console.log('order',order);
            // console.log('orderid',order.id);
            if(data.order.id===order.id && data.accept === true)
              return navigate('/customer-decide', {state : {order : data.order}})
            // }
            else return;
              
          })

    },[socket])

    const preventCancel = async(e) => {
      try {
        e.preventDefault()
        setPress(true)
        
      } catch (error) {
        console.error(error)
      }
    }

    const cancel = async(e) => {
      try {
        e.preventDefault()
        // const check = window.confirm('CANCEL ?')
        // if(!check) return;

        await axios.delete(`/order/${order.id}`)
        
        return navigate('/index')

        
      } catch (error) {
        console.error(error)
      }
    }

    const back = async(e) => {
      try {
        e.preventDefault()
        setPress(false)
        
      } catch (error) {
        console.error(error)
      }
    }

    let content = (
      <div className='customer-waiting-content'>
        <h1 className='customer-waiting-tag'>
          Please wait <br></br>
          a moment <br></br> 
          the system's <br></br>
          looking for <br></br>
          a shop  <br></br>
          in your area
        </h1>
        <button className='customer-waiting-button' type='button' onClick={(e) => preventCancel(e)}><strong>CANCEL</strong></button>
      </div>
    )

    if(press) { 
      content = (
        <>
        <h1 className='customer-waiting-cancel-title'>Do you sure <br></br> to cancel order</h1>
        <div className='customer-waiting-cancel-button'>
            <button className='customer-waiting-cancel-yes' onClick={e=>cancel(e)} type='submit'><strong>YES</strong></button>
            <button className='customer-waiting-cancel-no' onClick={e=>back(e)} type='button'><strong>NO</strong></button>
        </div>
        </>
      )
    }



  return (
    <div className='customer-waiting'>
      <Header />
      {content}
    </div>
  )
}
export default Waiting