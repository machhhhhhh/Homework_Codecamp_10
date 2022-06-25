import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, Link} from 'react-router-dom'
import axios from '../../../config/axios'
import '../../css/customer/historyDetail.css'

import Header from '../components/Header'

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ChatIcon from '@mui/icons-material/Chat';
import ReportIcon from '@mui/icons-material/Report';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function HistoryDefail() {

    const location = useLocation()
    const navigate = useNavigate()
    const order_id = location.state.order_id

    const [history, setHistory] = useState([])
    const [qr, setQR] = useState(false) // false == not pay || not create
    const [checkReport, setReport] = useState(false)


    useEffect(()=>{


        const fetchHistory = async() => {
            try {
                const result = await axios.get(`/history-customer/${order_id}`)
                setHistory(result.data)
            } catch (error) {
                console.error(error)
            }
        }

        const isPay = async() => {
            try {
                    const result = await axios.get(`/invoice/${order_id}`)
                    setQR(result.data.check)
                
            } catch (error) {
                console.error(error)
            }
        }

        const isReport = async() => {
            try {
                    const result = await axios.get(`/report/${order_id}`)
                    setReport(result.data.check)
                
            } catch (error) {
                console.error(error)
            }
        }

        fetchHistory()
        isPay()
        isReport()
        
    },[])
    

    const back = async(e) => {
        try {
            e.preventDefault()
            return navigate('/customer-history')
            
        } catch (error) {
            console.error(error)
        }
    }
    const code = async(e) => {
        try {
            e.preventDefault()
            // return navigate('/customer-invoice')
            
        } catch (error) {
            console.error(error)
        }
    }
    const chat = async(e) => {
        try {
            e.preventDefault()
            // return navigate('/customer-chat')
            
        } catch (error) {
            console.error(error)
        }
    }
    const report = async(e) => {
        try {
            e.preventDefault()
            return navigate('/customer-report',{state:{ order_id : order_id , shop : history.Order.Shop.shopname}})
            
        } catch (error) {
            console.error(error)
        }
    }
    

  return (
    <div className='customer-history-detail'>
        <Header/>
        {history.length!==0 && (
            <div className='customer-history-detail-info'>
                <h1 className='customer-history-detail-problem' >Problem : <span className='customer-history-detail-problem-span'>{history.Order.problem}</span></h1>
                <h1 className='customer-history-detail-shop' >Shop : <span className='customer-history-detail-shop-span'>{history.Order.Shop.shopname}</span></h1>
                <h1 className='customer-history-detail-date' >Date : <span>{history.Order.createdAt.slice(0,10)}</span></h1>
            </div>
        )}
        
        {/* {(list) && ()} */}



        <div className='customer-history-detail-button'>
            <button className='customer-history-detail-button-back' onClick={(e)=>back(e)}><ArrowBackIcon fontSize='large' /></button>
            <button className='customer-history-detail-button-chat' onClick={(e)=>chat(e)}><ChatIcon fontSize='large' /></button>
            <button className='customer-history-detail-button-qr-code' disabled={!qr} onClick={(e)=>code(e)}><QrCodeScannerIcon fontSize='large'/></button>
            <button className='customer-history-detail-button-report' disabled={checkReport} onClick={(e)=>report(e)}  ><ReportIcon fontSize='large' /></button>
        </div>

    </div>
  )
}