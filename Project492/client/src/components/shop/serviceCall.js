import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import Header from '../customer/components/Header'

export default function ServiceCall() {

    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state.order


    const see = async(e) => {
      try {
        e.preventDefault()

        return navigate('/shop-confirm', {state : {order : order}})

      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className='shop-service-call'>
        <Header />
        <h1>There is <br></br> a service call</h1>
        <button type='submit' onClick={(e)=>see(e)} ><strong>detail</strong></button>
    </div>
  )
}
