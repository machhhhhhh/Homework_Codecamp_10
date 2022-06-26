import React, { useRef ,useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Header from '../components/Header'
import axios from '../../../config/axios';
import '../../css/customer/invoice.css'

function Invoice() {

    const navigate = useNavigate()
    const location = useLocation()
    const inputEl = useRef()
    const [image, setImage] = useState(null)

    const order_id = location.state.order_id
    const invoice_photo = location.state.invoice_photo

    const updateInvoice = async(e) => {
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append('invoiceImg', e.target.files[0])
            setImage(e.target.files[0])

            const result = await axios.put(`/invoice/${order_id}`, formData)
            // console.log(result);

            // setImage(null)
            // inputEl.current.value = null

            return;
            
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
    <div className='customer-invoice'>

        <Header/>

        <div className='customer-invoice-photo'>

            <input 
                    type='file'
                    onChange={e => updateInvoice(e)} 
                    hidden
                    ref={inputEl}
                    alt = 'invoice'
                />
            
            {invoice_photo || image ? (
                <>
                    <img
                        className='customer-invoice-photo-image'
                        src={image? URL.createObjectURL(image) : invoice_photo}
                        alt='invoice'
                        onClick={()=>inputEl.current.click()}
                    />
                    <div className='customer-invoice-back-div'>
                        <button className='customer-invoice-back' onClick={(e)=>back(e)}><strong>BACK</strong></button>
                    </div>
                </>
            )
            :
                <>
                    <div className='customer-invoice-photo-icon'>
                        <AddPhotoAlternateIcon fontSize='large' className='customer-invoice-photo-icon-tag' onClick={()=>inputEl.current.click()}/>
                    </div>
                    <div className='customer-invoice-back-div'>
                            <button className='customer-invoice-back-2' onClick={(e)=>back(e)}><strong>BACK</strong></button>
                    </div>
                </>
            }
        </div>

        
    </div>
  )
}

export default Invoice