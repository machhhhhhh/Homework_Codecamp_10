import React from 'react'
import { useNavigate } from 'react-router-dom'

function Order() {

    const navigate = useNavigate()

    const back = async(e) => {
        try {
            e.preventDefault()
            return navigate('/index')
            
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div>
        <h1>Order</h1>
        <button onClick={(e)=>back(e)}>BACK</button>
    </div>
  )
}

export default Order