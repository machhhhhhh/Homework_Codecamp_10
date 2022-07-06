import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../config/axios'
import Header from '../customer/components/Header'
import Histories from './components/Histories'
import '../css/shop/history.css'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import socket from '../../config/socket'

function History({goToPage}) {

  const [history, setHistory] = useState([])


  const fetchHistory = async() => {
    try {
        const result = await axios.get('/history-shop')
        // console.log(result.data);
        setHistory(result.data)
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchHistory()
    socket.connect()
  },[])

  const destroy = async(e) => {
    try {
        e.preventDefault()
        const check = window.confirm('Clear all ??!')
        if(!check) return;

        await axios.post('/history-shop/clear')
        
        return fetchHistory()
        
    } catch (error) {
        console.error(error)
    }
}

  const back = async(e) => {
    try {
      e.preventDefault()
      goToPage('/home')
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className='shop-history' style={{height : history.length > 5 ? 'auto' : '100vh'}}>

      <Header/>

      <div className='shop-history-title'>

          <div className='shop-history-title-info'>

          {(history.length!==0) && (
                <div className='shop-history-header'>
                 <ArrowBackIcon fontSize='large' className='customer-history-back' onClick={(e)=>back(e)}/>
                    <DeleteIcon fontSize='large' className='shop-history-header-delete' onClick={(e)=>destroy(e)}/>
                </div>
            )}
            {(history.length===0) && (
                <h1 className='customer-history-no-list'>No History Now</h1>
            )}
            
              {history && history.map(item => 
                    <Histories 
                      key={item.id}
                      history = {item}
                      goToPage = {goToPage}
                      reload = {fetchHistory}
                    />
              )}
          </div>

          {history.length===0 && (
            <div className='customer-history-div'>
              <button type='button' className='customer-history-back-button' onClick={(e)=>back(e)}><strong>BACK</strong></button>
          </div>
          )}

      </div>

    </div>
  )
}

export default History