import axios from '../../../config/axios'
import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import socket from '../../../config/socket'
import Header from '../components/Header'
import '../../css/customer/waiting.css'

function Waiting() {

    const location = useLocation()
    const navigate = useNavigate()
    const order = location.state.order

    useEffect(()=>{

          socket.on('customer-decide', data => {
            // console.log('data',data);
            // console.log('order',order);
            // console.log('orderid',order.id);
            if(data.order.id===order.id && data.accept === true)
              return navigate('/customer-decide', {state : {order : data.order}})
            // }
            else return;
              
          })

    },[socket])

    const cancel = async(e) => {
      try {
        e.preventDefault()
        const check = window.confirm('CANCEL ?')
        if(!check) return;

        await axios.delete(`/order/${order.id}`)
        
        return navigate('/index')

        
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className='customer-waiting'>
      <Header />
      <div className='customer-waiting-content'>
        <h1 className='customer-waiting-tag'>
          Please wait <br></br>
          a moment <br></br> 
          the system's <br></br>
          looking for <br></br>
          a shop  <br></br>
          in your area
        </h1>
        <button className='customer-waiting-button' onClick={(e) => cancel(e)}><strong>CANCEL</strong></button>
      </div>
    </div>
  )
}
export default Waiting