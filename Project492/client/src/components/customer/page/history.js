import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from '../../../config/axios'
import '../../css/customer/history.css'
import {  useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';

import Histories from '../components/Histories'

function History() {

    const navigate = useNavigate()

    const[history, setHistory] = useState([])
    

    useEffect(()=>{

        fetchHistory()

    },[])

    const fetchHistory = async() => {
        try {
            
            const result = await axios.get('/history-customer')
            // console.log(result.data);
            setHistory(result.data)

        } catch (error) {
            console.error(error)
        }
    }

    const destroy = async() => {
        try {

            const check = window.confirm('Sure ??!')
            if(!check) return;

            await axios.post('/history-customer/clear')
            
            return fetchHistory()
            
        } catch (error) {
            console.error(error)
        }
    }

    const back = async() => {
        try {
            return navigate('/customer-profile')
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className='customer-history'>
        <Header/>

            {(history.length!==0) && (
                <div className='customer-history-header'>
                    <h1></h1>
                    <DeleteIcon fontSize='large' className='customer-history-header-delete' onClick={()=>destroy()}/>
                </div>
            )}

            {(history.length===0) && (
                <h1 className='customer-history-no-list'>No History Now</h1>
            )}
            {history && history.map(item => (
                        <Histories 
                            key={item.id} 
                            history = {item}  
                            reload = {fetchHistory}  
                        />   
                ))}

        <div className='customer-history-div'>
            <button className='customer-history-back' onClick={()=>back()}><strong>BACK</strong></button>
        </div>
    </div>
  )
}

export default History