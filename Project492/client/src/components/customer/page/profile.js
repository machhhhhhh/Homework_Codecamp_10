import React , {useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from '../../../config/axios'
import '../../css/customer/profile.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import Header from '../components/Header'

const url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'

function Profile({logout}) {

    const inputEl = useRef()

    const [image, setImage] = useState(null)
    const [user, setUser] = useState([])
    

    const navigate = useNavigate()
    const name = user.firstname + ' ' + user.lastname

    useEffect(()=>{
        
        const getUser = async() => {
          try {
            
            const result = await axios.get('/user')
            setUser(result.data)
            
          } catch (error) {
            console.error(error)
          }
        }

        getUser()

    },[])

    const updateProfile = async(e) => {
      try {
          e.preventDefault()
          inputEl.current.click()

          if(image){
            const formData = new FormData()
            formData.append('customerImg', image)

            await axios.put('/customer/profile', formData)
          }

          // return navigate('/customer-profile')
        
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

    const history = async() => {
      try {
        // setCheck(prev=>!prev)
        return navigate('/customer-history')
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className='customer-profile'>
        <Header/>

        <div className='customer-profile-image'>
            <input 
                type='file'
                onChange={e => setImage(e.target.files[0])} 
                hidden
                ref={inputEl}
                alt = 'customer-profile'
            />
            <img 
                className='customer-profile-image-tag'
                src={image? URL.createObjectURL(image) : user.image ? user.image : url}
                alt='customer-profile'
                onClick={(e)=>updateProfile(e)}
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