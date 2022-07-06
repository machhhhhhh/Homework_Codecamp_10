import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import {  useNavigate } from 'react-router-dom';
import axios from '../../../config/axios';
import socket from '../../../config/socket'

export default function Histories({reload,history,goToPage}) {

  const navigate = useNavigate()

    const destroy = async(e) => {
        try {
            e.preventDefault()
            const check = window.confirm('Sure ??!')
            if(!check) return;

            await axios.put(`/history-shop/${history.OrderId}`)
        
        return reload()

            
        } catch (error) {
            console.error(error)
        }
    }

    const see = async(e) =>{
      try {
        e.preventDefault()
        await socket.disconnect()
        return navigate('/shop-history-detail', {state : {order_id: history.OrderId}} )
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className='histories'>
              {history.Order && (<h1 className='histories-time'><strong>{history.Order.createdAt.slice(0,10)}</strong></h1>)}
              <ClearIcon fontSize='large' className='histories-delete' onClick={e=>destroy(e)} />
              <ArrowForwardIosIcon fontSize='large' className='histories-appear' onClick={e=>see(e)} />
    </div>
  )
}
