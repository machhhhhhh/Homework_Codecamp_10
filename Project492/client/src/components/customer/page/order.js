import React, {useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/customer/order.css'
import Header from '../components/Header'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from '../../../config/axios'
import socket from '../../../config/socket'

function Order() {

    const navigate = useNavigate()
    const inputEl = useRef()
    
    // const latitude, longitude

    const [problem ,setProblem] = useState(`Can't Start`)
    const [brand, setBrand] = useState('Honda')
    const [model, setModel] = useState('Wave')
    const [description, setDescription] = useState('')
    const [check, setCheck] = useState(false)

    let image = []

    const prevent = async(e) => {
        try {
            e.preventDefault()
            setCheck(true)

        } catch (error) {
            console.error(error)
        }
    }


    const search = async(e) => {
        try {
            e.preventDefault()

            // if(!window.confirm('Sure ??!')) return;

            const body = {
                problem : problem,
                // description : description,
                brand : brand,
                model : model
                // latitude : 
                // longitude : 
            }
            if(description!=='') body.description = description

            const result = await axios.post('/order', body)

            // reload()

            // console.log(result.data);

            const data = {
                order_id : result.data.id,
                order : result.data
            }

            await socket.emit('matching-user' ,result.data.id)
            await socket.emit('send-order', data)



            // const formData = new FormData()

            setDescription('')

            return navigate('/order-waiting', {state : {order : result.data}})

        } catch (error) {
            console.error(error)
        }
    }

    const inputPhoto = async(e) => {
        try {
            e.preventDefault()

            return image.push(e.target.files[0])

        } catch (error) {
            console.error(error)
        }
    }

    const back = async(e) => {
        try {
            e.preventDefault()
            return navigate('/index')
            
        } catch (error) {
            console.error(error)
        }
    }

    const cancel = async(e) => {
        try {
            e.preventDefault()
            setCheck(false)
        } catch (error) {
            console.error(error)
        }
    }
    

    const problems = [
        `Can't Start`,
        "Broken tire",
        'Others'
    ]

    const brands = [
        'Honda',
        'Yamaha',
        'Kawasaki',
        'Vespa',
        'Ducati',
        'BMW',
        'Harley',
        'Others'
    ]

    let models = []

    if(brand ==='Honda'){
        models = [
            'Wave',
            'Click',
            'Scoopy-I',
            'Zoomer-X',
            'PCX',
            'MSX',
            'CRF',
            'CBR',
            'CB',
            'Moove',
            'Alpha',
            'Others'
        ]
    }

    if(brand ==='Others') models = ['Others']

    if(brand==='Yamaha') {
        models = [
            'Finn',
            'GT',
            'Fino',
            'Filano',
            'Lexi',
            'Jupiter',
            'QBIX',
            'Tricity',
            'Others'
        ]
    }

    if(brand==='Kawasaki'){
        models = [
            'D-tracker', 
            'Ninja',
            'KLR',
            'KLX', 
            'KX', 
            'Versys', 
            'Vulcan', 
            'Meguro',
            'Others'
        ]
    }

    if(brand==='Ducati'){
        models = [
            'Diavel', 
            'Hypermotard',
            'Monster',
            'Multistrada', 
            'Panigale', 
            'Scrambler', 
            'Streetfighter', 
            'SuperSport',
            'Others'
        ]
    }
    if(brand==='Vespa'){
        models = [
            'S-125', 
            'LX',
            'Sprint',
            'Primavera', 
            'GTS', 
            'Others'
        ]
    }

    if(brand==='BMW'){
        models = [
            'C', 
            'F',
            'G',
            'K', 
            'R', 
            'S',
            'Others'
        ]
    }
    if(brand==='Harley'){
        models = [
            'CVO', 
            'Pan America',
            'Softail',
            'Sportster', 
            'GTS', 
            'Others'
        ]
    }

    let content = (
        <div className='customer-order'>
            <Header />
            <form className='customer-order-form'>
                <div className='customer-order-form-info'>

                    <div className='customer-order-form-info-detail'>
                        <h1 className='customer-order-form-info-detail-title'>Problem :</h1>
                        <select value={problem} onChange={e => setProblem(e.target.value)}>
                            {problems.map((problem,key) => (
                                <option key={key} defaultValue={problems[0]} value={problem}>{problem}</option>
                                ))}
                        </select>
                    </div>

                    <div className='customer-order-form-info-detail'>
                    <h1 className='customer-order-form-info-detail-title'>Brand :</h1>
                        <select value={brand} onChange={e => setBrand(e.target.value)}>
                            {brands.map((brand,key) => (
                                <option key={key} defaultValue={brands[0]} value={brand}>{brand}</option>
                                ))}
                        </select>

                    </div>
                    <div className='customer-order-form-info-detail'>
                        <h1 className='customer-order-form-info-detail-title'>Model :</h1>
                        <select value={model} onChange={e => setModel(e.target.value)}>
                            {models.map((model,key) => (
                                <option key={key} defaultChecked={models[0]} value={model}>{model}</option>
                                ))}
                        </select>
                    </div>
                

                    <TextareaAutosize 
                        className='customer-order-text-area' 
                        minRows={3}
                        placeholder='Note Here ... '
                        value = {description}
                        onChange = {e => setDescription(e.target.value)}    
                    />

                    <div className='customer-order-photo'>
                        <h1 className='customer-order-photo-add'>Photo <AddAPhotoIcon className='customer-order-photo-icon' fontSize='large' onClick={()=>inputEl.current.click()}/> </h1>
                        <input 
                            type='file'
                            onChange={e => inputPhoto(e)} 
                            hidden
                            ref={inputEl}
                            alt = 'order'
                        />
                        {image.length!==0 && (
                            image.map(item => 
                                    <img 
                                    src={URL.createObjectURL(item) }
                                    alt='order'
                                />)
                        )}
                    </div>


                </div>
                
                <div className='customer-order-button'>
                    <button className='customer-order-button-search' type='submit' onClick={(e)=>prevent(e)} ><strong>SEARCH</strong></button>
                    <button className='customer-order-button-cancel' type='button' onClick={(e)=>back(e)}><strong>CANCEL</strong></button>
                </div>

            </form>
        </div>
    )

    if(check) {
        content = (
            <div className='customer-order-prevent'>
                <Header />
                <h1 className='customer-order-prevent-tag'>Are you looking <br></br> for a repair shop ?</h1>
                <div className='customer-order-button'>
                    <button className='customer-order-button-search' type='submit' onClick={(e)=>search(e)} ><strong>OK</strong></button>
                    <button className='customer-order-button-cancel' type='button' onClick={(e)=>cancel(e)}><strong>CANCEL</strong></button>
                </div>
            </div>
        )
    }
    


  return (
        <>
            {content}
        </>
  )
}

export default Order