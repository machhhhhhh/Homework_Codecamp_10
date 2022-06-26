import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/css/shop/home.css'

function Home() {

  const navigate = useNavigate()

  const getStart = async(e) => {
    try {
      e.preventDefault()
      return navigate('/shop-profile')
      
    } catch (error) {
      console.error(error)
    }
  }

  const history = async(e) => {
    try {
      e.preventDefault()
      return navigate('/shop-history')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='shop-home'>

      <div className='shop-home-logo'>
          <img 
              className='shop-home-logo-image'
              src='https://res.cloudinary.com/drnmadwqu/image/upload/v1655873717/logo_vd9prv.png' 
              alt='app-logo'
            />
      </div>

      
        <button className='shop-home-start' type='button' onClick={e=>getStart(e)} ><strong>Get Start</strong></button>
        <button className='shop-home-history' type='button' onClick={e => history(e)} ><strong>History</strong></button>
          
    </div>
  )
}

export default Home