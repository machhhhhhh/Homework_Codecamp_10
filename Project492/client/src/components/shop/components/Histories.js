import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import axios from '../../../config/axios';


export default function Histories({reload,history}) {

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

  return (
    <div className='histories'>
              {history.Order && (<h1 className='histories-time'><strong>{history.Order.createdAt.slice(0,10)}</strong></h1>)}
              <ClearIcon fontSize='large' className='histories-delete' onClick={e=>destroy(e)} />
              <Link to='/shop-history-detail' state={{ order_id: history.OrderId }}>
                <ArrowForwardIosIcon fontSize='large' className='histories-appear' />
              </Link>
    </div>
  )
}
