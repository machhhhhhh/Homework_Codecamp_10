import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../../css/customer/map.css'
import Header from '../components/Header'


function Map() {

    const navigate = useNavigate()

    const back = async(e) => {
        try {
            e.preventDefault()
            return navigate('/index')
            
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className='customer-map'>

        <Header/>
        <h1>MAP ROAD</h1>

        <h1 className='customer-map-back-button' onClick={(e)=>back(e)}><strong>BACK</strong></h1>
    </div>
  )
}

export default Map