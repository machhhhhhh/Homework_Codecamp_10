import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from '../../../config/axios'
import socket from '../../../config/socket'
import '../../css/customer/decide.css'
import Header from '../components/Header'

function Decide() {

    const location = useLocation()
    const navigate = useNavigate()
    const order = location.state.order

    const yes = async(e) => {
        try {
            e.preventDefault()
            // const check  = window.confirm('Confirm ?!!')
            //  if(!check) return ;

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

            // const check  = window.confirm('Sure ?!!')
            // if(!check) return ;
            await axios.delete(`/order/${order.id}`)
            await socket.emit('customer-select', {order_id : order.id ,select : false})
            return navigate('/index')
            // navigate('/index')
             // problem is here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // window.location.reload()


        } catch (error) {
            console.error(error)
        }
    }


    

  return (
    <div className='customer-decide'>
        <Header />
        <h1 className='customer-decide-title'>
            Would you like <br></br>
            to accept <br></br>
        </h1>
        <h1 className='customer-decide-shop-name'>
                {order.Shop.shopname}
        </h1>
        <div className='customer-decide-button'>
            <button className='customer-decide-button-yes' type='submit' onClick={(e)=> yes(e)} ><strong>YES</strong></button>
            <button className='customer-decide-button-no' type='button' onClick={(e)=> no(e)} ><strong>NO</strong></button>
        </div>
    </div>
  )
}

export default Decide