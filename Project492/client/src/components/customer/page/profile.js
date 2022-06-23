import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom'
// import axios from '../../config/axios'
import '../../css/customer/profile.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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

    const history = async() => {
      try {
        // return navigate('/customer-history')
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

        <div className='customer-profile-info'>

              <div className='customer-profile-info-detail'>
                  <label>Name : </label>
                  <input type='text' value={name} />
              </div>

              <div className='customer-profile-info-detail'>
                  <label>E-Mail : </label>
                  <input type='text' value={user.username} />
              </div>
              <div className='customer-profile-info-detail'>
                  <label>Phone : </label>
                  <input type='text' value={user.phone} />
              </div>
        </div>
        <button className='customer-profile-history' onClick={()=>history()}><strong>History</strong></button>

        <div className='customer-profile-button'>
            <button className='customer-profile-button-back' onClick={(e)=>back(e)}><ArrowBackIosNewIcon fontSize='large'/></button>
            <button className='customer-profile-button-logout' onClick={()=>logout()}><ExitToAppIcon fontSize='large' /></button>
        </div>

    </div>
  )
}

export default Profile