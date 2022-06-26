import React, { useEffect } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'


function Waiting() {

    const location = useLocation()
    const navigate = useNavigate()
    const order = location.state.order

    useEffect(()=>{

        console.log(order);
    },[])

  return (
    <div>waiting</div>
  )
}
export default Waiting