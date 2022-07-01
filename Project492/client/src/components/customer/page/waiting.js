import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import socket from '../../../config/socket'

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

  return (
    <div>Please wait a moment</div>
  )
}
export default Waiting