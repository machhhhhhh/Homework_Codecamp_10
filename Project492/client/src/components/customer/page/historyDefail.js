import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
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
    const history_id = location.state.history_id

    const [history, setHistory] = useState([])
    const [qr, setQR] = useState(false) // false == not pay || not create
    const [checkReport, setReport] = useState(false)

    const [load, setLoad] = useState(false)


    useEffect(()=>{

        if(!history_id) navigate('/customer-history')

        const fetchHistory = async() => {
            try {
                const result = await axios.get(`/history-customer/${history_id}`)
                // console.log(result.data);
                setHistory(result.data)
                setLoad(true)
            } catch (error) {
                console.error(error)
            }
        }

        fetchHistory()
        
    },[])
    
    useEffect(()=>{

        const isPay = async() => {
            try {
                if(load){
                    const result = await axios.get(`/invoice/${history.OrderId}`)
                    console.log(result.data);
                    setQR(result.data.check)
                }
                
            } catch (error) {
                console.error(error)
            }
        }

        const isReport = async() => {
            try {
                if(load){
                    const result = await axios.get(`/report/${history.OrderId}`)
                    console.log(result.data);
                    setReport(result.data.check)
                }
                
            } catch (error) {
                console.error(error)
            }
        }
        

        isPay()
        isReport()

    },[load])

                
    

    const back = async() => {
        try {

            return navigate('/customer-history')
            
        } catch (error) {
            console.error(error)
        }
    }
    const code = async() => {
        try {

            // return navigate('/customer-invoice')
            
        } catch (error) {
            console.error(error)
        }
    }
    const chat = async() => {
        try {

            // return navigate('/customer-chat')
            
        } catch (error) {
            console.error(error)
        }
    }
    const report = async() => {
        try {

            // return navigate('/customer-report')
            
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
            <button className='customer-history-detail-button-back' onClick={()=>back()}><ArrowBackIcon fontSize='large' /></button>
            <button className='customer-history-detail-button-chat' onClick={()=>chat()}><ChatIcon fontSize='large' /></button>
            <button className='customer-history-detail-button-qr-code' disabled={!qr} onClick={()=>code()}><QrCodeScannerIcon fontSize='large'/></button>
            <button className='customer-history-detail-button-report' disabled={checkReport} onClick={()=>report()}  ><ReportIcon fontSize='large' /></button>
        </div>

    </div>
  )
}
