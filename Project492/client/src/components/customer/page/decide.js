import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from '../../../config/axios'
import socket from '../../../config/socket'

function Decide() {

    const location = useLocation()
    const navigate = useNavigate()
    const order = location.state.order

    useEffect(()=>{
        console.log(order);
    },[])

    const yes = async(e) => {
        try {
            e.preventDefault()
            const check  = window.confirm('Confirm ?!!')
             if(!check) return ;

            await socket.emit('customer-select', {order_id : order.id ,select : true})
            await axios.put(`/order/choose/${order.id}`)

            return navigate('/customer-show', {state : { order : order}})

        } catch (error) {
            console.error(error)
        }
    }

    const no = async(e) => {
        try {
            e.preventDefault()

            const check  = window.confirm('Sure ?!!')
            if(!check) return ;

            await socket.emit('customer-select', {order_id : order.id ,select : false})
            await axios.delete(`/order/${order.id}`)
            // navigate('/index')
             // problem is here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            return navigate('/index')
            // window.location.reload()


        } catch (error) {
            console.error(error)
        }
    }


    

  return (
    <div className='customer-decide'>
        <h1>decide</h1>
        <button type='submit' onClick={(e)=> yes(e)} >YES</button>
        <button type='button' onClick={(e)=> no(e)} >NO</button>
    </div>
  )
}

export default Decide