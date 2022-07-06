import React, { useEffect, useState, useRef } from 'react'
import {useLocation } from 'react-router-dom'
import axios from '../../config/axios'
import Header from '../customer/components/Header'

import CheckIcon from '@mui/icons-material/Check';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ChatIcon from '@mui/icons-material/Chat';
import socket from '../../config/socket'

import '../css/shop/historyDetail.css'

export default function HistoryDetail({goToPage}) {


    // const navigate = useNavigate()
    const location = useLocation()
    const inputEl = useRef()

    const [customerName, setName] = useState(null)
    const order_id = location.state.order_id
    const [history, setHistory] = useState([])

    const [image, setImage] = useState(null)
    const [inputOne, setInputOne] = useState(null)
    const [inputTwo, setInputTwo] = useState(null)
    const [inputThree, setInputThree] = useState(null)
    const [inputFour, setInputFour] = useState(null)
    const [inputFive, setInputFive] = useState(null)

    const [invoice, setInvoice] = useState(null)
    const [checkInvoice, setCheck] = useState(false) // false cannot make invoice
    const [invoiceList, setList] = useState(null)

    const fetchHistory = async() => {
        try {
            const result = await axios.get(`/history-shop/${order_id}`)
            setHistory(result.data)
            setName(result.data.Order.Customer.firstname + ' ' + result.data.Order.Customer.lastname)
            setInvoice(result.data.Order.Invoice)
            if(result.data.Order.Invoice.InLists!==null) setList(result.data.Order.Invoice.InLists)
            if(result.data.Order.Invoice) setCheck(true)
            console.log(result.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{

        fetchHistory()
        socket.connect()

    },[])


    const makeInvoice = async(e) => { // make invoice
        try {
            e.preventDefault()

            const check = window.confirm('Make Invoice ?!!')
            if(!check) return;

            const formData = new FormData()
            formData.append('invoiceImg', image)
            formData.append('order_id', order_id)

            const result = await axios.post('/invoice', formData)
            console.log(result.data);
            const invoice_id = result.data.id

            if(inputOne) await axios.post('/invoice/list', {description : inputOne, invoice_id : invoice_id})
            if(inputTwo) await axios.post('/invoice/list', {description : inputTwo, invoice_id : invoice_id})
            if(inputThree) await axios.post('/invoice/list', {description : inputThree, invoice_id : invoice_id})
            if(inputFour) await axios.post('/invoice/list', {description : inputFour, invoice_id : invoice_id})
            if(inputFive) await axios.post('/invoice/list', {description : inputFive, invoice_id : invoice_id})

            setInputOne('')
            setInputTwo('')
            setInputThree('')
            setInputFour('')
            setInputFive('')
            setImage('')

            return fetchHistory()
            // return navigate('/', {state : {order_id : order_id}})
            
        } catch (error) {
            console.error(error)
        }
    }

    const chat = async(e) => {
        try {
            e.preventDefault()
            // return navigate('/shop-chat', {state: {}})
            
        } catch (error) {
            console.error(error)
        }
    }

    const code = async(e) => {
        try {
            e.preventDefault()
            return inputEl.current.click()
            
        } catch (error) {
            console.error(error)
        }
    }

    const back = async(e) => {
        try {
            e.preventDefault()
            goToPage('/shop-history')
            
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className='shop-history-detail'>
        <Header/>
            {history.length!==0 && (
                <div className='shop-history-detail-info'>
                    <h1 className='shop-history-problem' >Problem : <span className=''>{history.Order.problem}</span></h1>
                    <h1 className='shop-history-customer-name' >Customer's Name : <br></br> <span className=''>{customerName}</span></h1>
                    <h1 className='shop-history-date' >Date : <span>{history.Order.createdAt.slice(0,10)}</span></h1>
                </div>
            )}

            {!invoice && (
                <div className='shop-history-detail-list'>
                    <h1 className='input-list-header'>List</h1>
                    <div className='shop-history-detail-list-input'>
                        <input placeholder='list 1' value={inputOne} onChange={e => setInputOne(e.target.value)} />
                        <input placeholder='list 2' value={inputTwo} onChange={e => setInputTwo(e.target.value)} />
                        <input placeholder='list 3' value={inputThree} onChange={e => setInputThree(e.target.value)} />
                        <input placeholder='list 4' value={inputFour} onChange={e => setInputFour(e.target.value)} />
                        <input placeholder='list 5' value={inputFive} onChange={e => setInputFive(e.target.value)} />
                    </div>
                </div>
            )}

            {invoice && (
                <>

                            {invoiceList.length !== 0 
                            ? 
                                <div className='shop-history-detail-list-show'>
                                    <h1 className='list-header'>List</h1>
                                    
                                    <div className='list-item'>
                                        { invoiceList.map(list => 
                                            <h3 key={list.id}>- {list.description}</h3>
                                        )}
                                    </div>

                                </div>

                            : <h3>No Lists Found</h3>
                            }
                            
                            <div className='list-image'>
                                {invoice.photo && 
                                    <img
                                        className='invoice-image'
                                        src={invoice.photo}
                                        alt='invoice'
                                    />}
                                
                            </div>
                </>

            )}

            <input 
                type='file'
                onChange={e => setImage(e.target.files[0])} 
                hidden
                ref={inputEl}
                alt = 'invoice'
            />
            {image && (
                    <div className='shop-history-tag'>
                        <img 
                            className='shop-profile-image-tag'
                            src={URL.createObjectURL(image)}
                            alt='invoice'
                        />
                    </div>
            )}

            <div className='shop-history-detail-button'>
                    <button className='button-back' onClick={e=>back(e)} type='button'><ArrowBackIosNewIcon fontSize='large' /></button>
                    <button className='button-code' onClick={e=>code(e)} type='button' disabled={checkInvoice} ><QrCodeScannerIcon fontSize='large' /></button>
                    <button className='button-chat' onClick={e=>chat(e)} type='button'><ChatIcon fontSize='large' /></button>
                    <button className='button-send' onClick={e=>makeInvoice(e)} type='submit' disabled={checkInvoice} ><CheckIcon fontSize='large' /></button>
            </div>

    </div>
  )
}
