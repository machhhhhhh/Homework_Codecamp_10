import axios from '../../../config/axios'
import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import socket from '../../../config/socket'
import Header from '../components/Header'

function Waiting() {

    const location = useLocation()
    const navigate = useNavigate()
    const order = location.state.order

    useEffect(()=>{

          socket.on('customer-decide', data => {
            // console.log('data',data);
            // console.log('order',order);
            // console.log('orderid',order.id);
            if(data.order===order.id && data.accept === true)
              return navigate('/customer-decide', {state : {order : order}})
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
    <div>
      <Header />
      <h1>Please wait a moment</h1>
      <button onClick={(e) => cancel(e)}>CANCEL</button>
    </div>
  )
}
export default Waiting