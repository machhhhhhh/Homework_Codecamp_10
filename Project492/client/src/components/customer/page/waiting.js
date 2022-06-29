import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000', {
    transports : ['websocket'], 
    withCredentials: true,
    extraHeaders: {
    "my-custom-header": "abcd"
    }})

function Waiting() {

    const location = useLocation()
    const navigate = useNavigate()
    const order = location.state.order

    useEffect(()=>{

          socket.on('customer-decide', data => {
            console.log(data);
            // if(data.id===order.id)
              // return navigate('/customer-decide', {state : {order : order}})
          })

    },[socket])

  return (
    <div>Please wait a moment</div>
  )
}
export default Waiting