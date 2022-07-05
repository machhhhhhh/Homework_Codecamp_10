import React, { useEffect ,useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import Header from '../customer/components/Header'
// import axios from '../../config/axios'
// import jwtDecode from 'jwt-decode'
import socket from '../../config/socket'
import '../css/shop/waiting.css'

function Waiting() {

    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state.order
    // const shopid = jwtDecode(token)
    const [userDecide, setDecide] = useState(null)

    // query one order where shop and accept
    // order not found ==> alert
    // 
    
    useEffect(()=>{

      console.log(userDecide);
      if(userDecide===true) navigate('/shop-show', {state : {order : order}})
      if(userDecide===false) navigate('/home')

    },[userDecide])

    useEffect(()=>{

      socket.on('show-order', data => {
        // console.log(data);
          if(data.order_id === order.id ) setDecide(data.select)

      })

    },[socket])

    // useEffect(()=>{
    //     console.log(order);
    // },[])

  return (
    <div className='shop-waiting'>
      <Header />
      
      <div className='shop-waiting-title'>
        <h1 className='shop-waiting-content'>
          Please <br></br>
          wait for <br></br>
          customer <br></br>
          confirmed
        </h1>
      </div>

    </div>
  )
}

export default Waiting