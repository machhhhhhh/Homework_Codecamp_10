import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Show() {

    const navigate = useNavigate()
    const location = useLocation()
    const order = location.state.order


  return (
    <div>Shop Show</div>
  )
}
