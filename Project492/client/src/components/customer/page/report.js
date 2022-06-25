import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import '../../css/customer/report.css'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import Header from '../components/Header'
import axios from '../../../config/axios';
import e from 'cors';

function Report() {


    const location = useLocation()
    const navigate = useNavigate()
    const order_id = location.state.order_id
    const shop = location.state.shop

    const inputEl = useRef()
    // const [image, setImage] = useState([])
    let image = []
    const [description, setDescription] = useState('')


    const report = async(e) => {
        try {
            e.preventDefault()

            const body = {
                description : description
            }

            const check = window.confirm('Sure ??!')
            if(!check) return;
            const result = await axios.put(`/report/${order_id}`, body)
            const report_id = result.data.report.id

            // if(image.length!==0) {
            //     for(let i=0; i< image.length; i++){

            //         const formData = new FormData()
            //         formData.append('ReportId', report_id)
            //         formData.append('reportImg', image[i])

            //         await axios.post('/report/photo', formData)
            //     }
            // }

            // setDescription('')
            // // setImage(null)
            // inputEl.current.value = null

            return navigate('/customer-history-detail',{state:{ order_id : order_id}})
            
        } catch (error) {
            console.error(error)
        }
    }

    const back = async (e) => {
        try {
            e.preventDefault()
            return navigate('/customer-history-detail' , {state : {order_id : order_id}})
            
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className='customer-report'>

            <Header/>

            <h1 className='customer-report-header'><strong>REPORT</strong></h1>

            {shop && <h1 className='customer-report-shop'>Shop : <span className='customer-report-shop-name'>{shop}</span></h1>}


            <form className='customer-report-form'>

                <TextareaAutosize 
                    className='customer-report-text-area' 
                    minRows={3}
                    placeholder='Type Something Here '
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}    
                />

                <div className='customer-report-photo'>
                    <h1 className='customer-report-photo-add'>Photo <AddAPhotoIcon className='customer-report-photo-icon' fontSize='large' onClick={()=>inputEl.current.click()}/> </h1>
                    <input 
                        type='file'
                        onChange={e => image.push(e.target.files[0])} 
                        hidden
                        ref={inputEl}
                        alt = 'report-photo'
                    />

                    
                    {/* {image.length!==0 && (

                        image.forEach((photo,key) => 
                            <img 
                                key={key}
                                src={photo && URL.createObjectURL(photo) }
                                alt='report-photo'
                            /> )
                    )} */}

                </div>

                <div className='customer-report-form-button'>
                    <button className='customer-report-form-button-subbmit' type='submit' onClick={(e)=>report(e)} ><strong>SEND</strong></button>
                    <button className='customer-report-form-button-cancel' onClick={(e)=>back(e)}><strong>CANCEL</strong></button>
                </div>
            </form>


    </div>
  )
}

export default Report