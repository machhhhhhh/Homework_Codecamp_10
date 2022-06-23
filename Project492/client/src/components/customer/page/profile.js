import React from 'react'
import {useNavigate} from 'react-router-dom'
// import axios from '../../config/axios'
import '../../css/customer/profile.css'

import Header from '../components/Header'

const URL = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'

function Profile({logout, user}) {

    const navigate = useNavigate()
    const name = user.firstname + ' ' + user.lastname

    const back = async(e) => {
      try {
  
        e.preventDefault()
  
        return navigate('/customer-profile')
        
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className='customer-profile'>
        <Header/>

        <div className='customer-profile-image'>
            <img 
                className='customer-profile-image-tag'
                src={user.image ? user.image : URL}
                alt='customer-profile'
            />
        </div>
        {name}

        <button onClick={()=>logout()}>out</button>
        <button onClick={(e)=>back(e)}>back</button>
    </div>
  )
}

export default Profile