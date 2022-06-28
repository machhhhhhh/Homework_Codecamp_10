import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import io from 'socket.io-client'
import axios from '../../../config/axios'

const socket = io.connect('http://localhost:5000', {
    transports : ['websocket'], 
    withCredentials: true,
    extraHeaders: {
    "my-custom-header": "abcd"
    }})

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
            socket.emit('customer-select', {select : true})

            return navigate('/customer-show', {state : { order : order}})

        } catch (error) {
            console.error(error)
        }
    }

    const no = async(e) => {
        try {
            e.preventDefault()

            socket.emit('customer-select', {select : false})
            navigate('/index')

           return await axios.delete(`/order/${order.id}`)


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