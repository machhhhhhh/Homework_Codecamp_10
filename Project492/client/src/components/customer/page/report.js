import React, {  useRef, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import '../../css/customer/report.css'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Header from '../components/Header'
import axios from '../../../config/axios';

function Report() {


    const location = useLocation()
    const navigate = useNavigate()
    const order_id = location.state.order_id
    const shop = location.state.shop

    const inputEl = useRef()
    const [image, setImage] = useState([])
    // let image = []
    const [description, setDescription] = useState('')
    const [clear, setClear] = useState(false)
    const [preventPressReport, setPreventReport] = useState(false)
    const [success, setSuccess] = useState(false)

    const preventReport = (e) => {
        try {
            e.preventDefault()
            setPreventReport(true)
        } catch (error) {
            console.error(error)
        }
    }

    const report = async(e) => {
        try {
            e.preventDefault()

            const body = {
                description : description
            }

            // const check = window.confirm('Sure ??!')
            // if(!check) return;
            const result = await axios.put(`/report/${order_id}`, body)
            // console.log(result);
            const report_id = result.data.report.id
            setSuccess(true)
            if(image.length!==0) {
                // for(let i=0; i< image.length; i++){

                    // const formData = new FormData()
                    // formData.append('ReportId', report_id)
                    // formData.append('reportImg', image[i])

                    // await axios.post('/report/photo', formData)
                // }

                for(const photo of image){

                    const formData = new FormData()
                    formData.append('report_id', report_id)
                    formData.append('reportImg', photo)
                    await axios.post('/report/photo', formData)
                }

            }

            setDescription('')
            // setImage(null)
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
    
    const inputPhoto = async(e) => {
        try {
            e.preventDefault()
            
            // setImage(...image,e.target.files[0])
            // image = e.target.files[0]
            
            // console.log(image);
            // image.push(e.target.files[0])
            setImage([...image, e.target.files[0]])
            // setImage(e.target.files[0])
            // setImage((image) => [...image,e.target.files[0]])
            // console.log(e.target.files[0]);
            // console.log(image);

        } catch (error) {
            console.error(error)
        }
    }

    // const showPhoto = async()=>{
    //     try {
    //         for(let i=0; i< image.length; i++){
    //             <img 
    //                 src={URL.createObjectURL(image[i]) }
    //                 alt='report-photo'
    //             />
    //     }
            
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const preventClear = (e) =>{
        try {
            e.preventDefault()
            setClear(true)

        } catch (error) {
            console.error(error)
        }
    }

    const yes = (e)=>{
        try {
            e.preventDefault()
            setImage([])
            setClear(false)
        } catch (error) {
            console.error(error)
        }
    }

    const no = (e) => {
        try {
            e.preventDefault()
            setClear(false)
            setPreventReport(false)
        } catch (error) {
            console.error(error)
        }
    }

    let content = (
        <>
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
                    <h1 className='customer-report-photo-add'>
                    <span>
                        Photo 
                        <AddAPhotoIcon className='customer-report-photo-icon' fontSize='large' onClick={()=>inputEl.current.click()}/> 
                     </span>   
                        {image.length!==0 && <DeleteForeverIcon className='customer-report-delete-icon' onClick={e=>preventClear(e)} fontSize='large'/>}
                    </h1>
                    <input 
                        type='file'
                        onChange={e => inputPhoto(e)} 
                        hidden
                        multiple
                        ref={inputEl}
                        alt = 'report'
                    />
                    {image.length!==0 && (
                        image.map((item,key) => 
                            <div className='customer-report-show'>
                                <img 
                                            key={key}
                                            className='customer-report-show-photo'
                                            src={URL.createObjectURL(item) }
                                            alt='report'
                                    />
                            </div>
                                
                            )
                    )}

                    {/* {image && (
                        <img 
                                    // key={item.id}
                                    src={URL.createObjectURL(image) }
                                    alt='report'
                            />
                    )} */}


                    

                </div>

                <div className='customer-report-form-button'>
                    <button className='customer-report-form-button-subbmit' type='submit' onClick={(e)=>preventReport(e)} ><strong>SEND</strong></button>
                    <button className='customer-report-form-button-cancel' type='button' onClick={(e)=>back(e)}><strong>CANCEL</strong></button>
                </div>
            </form>
        </>
    )

    if(clear) {
        content = (
            <div className='customer-report-clear'>
                <h1 className='customer-report-clear-header'>Clear Photo ??</h1>
                <div className='customer-report-clear-button'>
                    <button className='customer-report-clear-yes' type='submit' onClick={e=>yes(e)}><strong>Yes</strong></button>
                    <button className='customer-report-clear-no' type='button' onClick={e=>no(e)}><strong>No</strong></button>
                </div>
            </div>
        )
    }

    if(preventPressReport) {
        content = (
            <div className='customer-report-clear'>
                <h1 className='customer-report-clear-header'>Report ??!</h1>
                {!success && (
                        <h1 className='customer-report-success'>Redirecting ...</h1>
                    )}
                <div className='customer-report-clear-button'>
                    <button className='customer-report-clear-yes' type='submit' onClick={e=>report(e)}><strong>Yes</strong></button>
                    <button className='customer-report-clear-no' type='button' onClick={e=>no(e)}><strong>No</strong></button>
                </div>
            </div>
        )
    }


  return (
    <div className='customer-report' style={{height : clear ? '100vh' : preventPressReport ? '100vh' : 'auto'}}>

            <Header/>
            {content}
            


    </div>
  )
}

export default Report