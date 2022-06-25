import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import axios from '../../../config/axios';


function Histories({history, reload}) {
  

    const destroy = async() => {
      try {
        const check = window.confirm('Sure ??!')
        if(!check) return;

        await axios.put(`/history-customer/${history.id}`)
        
        return reload()
        
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className='histories'>
              {history.Order && (<h1 className='histories-time'><strong>{history.Order.createdAt.slice(0,10)}</strong></h1>)}
              <ClearIcon fontSize='large' className='histories-delete' onClick={()=>destroy()}/>
              <Link to='/customer-history-detail' state={{ history_id: history.id }}>
                <ArrowForwardIosIcon fontSize='large' className='histories-appear' />
              </Link>
    </div>
  )
}

export default Histories