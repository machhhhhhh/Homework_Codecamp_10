import React from 'react'
import {Avatar} from '@mui/material'
import '../components/css/customer/index.css'
import {useNavigate} from 'react-router-dom'

function Index({logout,user}) {

  const navigate = useNavigate()


  const profile = async(e) => {
    try {

      e.preventDefault()

      return navigate('/customer-profile')
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='customer-index'>
        
          <div className='customer-index-avatar' onClick={e=>profile(e)}>
            <h1></h1>
            <Avatar src={user && user.image } className='customer-index-avatar-image'  />
          </div>

        <div className='customer-index-logo'>
          <img 
              className='customer-index-logo-image'
              src='https://res.cloudinary.com/drnmadwqu/image/upload/v1655873717/logo_vd9prv.png' 
              alt='app-logo'
            />
        </div>

        <button className='customer-index-start'><strong>Get Start</strong></button>
        <button className='customer-index-map'><strong>Map</strong></button>

    </div>
  )
}

export default Index