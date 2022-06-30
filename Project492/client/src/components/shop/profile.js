import React, { useEffect, useRef } from 'react'
import { useNavigate} from 'react-router-dom'
import Header from '../customer/components/Header'
import axios from '../../config/axios'
import '../css/shop/profile.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'

function Profile({logout,user,reload, setChange, setUser}) {

    const navigate = useNavigate()
    const name = user.firstname + ' ' + user.lastname
    const inputEl = useRef()

    // useEffect(()=>{
    //     console.log(user);
    // },[])

    const updateProfile = async(e) => {
        try {
            e.preventDefault()
  
              const formData = new FormData()
              formData.append('shopImg', e.target.files[0])
  
              await axios.put('/shop/profile', formData)
            //   setChange(prev=>!prev)
              //   window.location.reload()

              reload()
            
              
            } catch (error) {
                console.error(error)
            }
        }
        
        const offline = async(e) => {
            try {
                e.preventDefault()
                const check = window.confirm('CLOSE ??')
                if(!check) return;
                await axios.put('/shop/off');
                // await reload();
                 window.location.reload()
                navigate('/home')
                // setUser(result.data.data)
                // const result = await axios.get('/user')   
                // setUser({...result.data})
                // setChange(prev=>!prev)
            // console.log(result.data.data);
            //  console.log("userdata offline:", user);
            // setChange(prev=>!prev)
            // return reload()
        } catch (error) {
            console.error(error)
        }
    }
    
    const online = async(e) => {
        try {
            e.preventDefault()
            const check = window.confirm('OPEN ??')
            if(!check) return;
            await axios.put('/shop/on')
            window.location.reload()
        //    await reload()
            navigate('/home')
        //    setUser(result.data.data)
        // console.log(result.data.data);
            // const result = await axios.get('/user');   
            // setUser({...result.data})
            //  console.log("userdata online:", user);
        } catch (error) {
            console.error(error)
        }
      }

    const back = async(e) => {
        try {
            e.preventDefault()
            return navigate('/home')
            
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className='shop-profile'>
        <Header/>
        <div className='shop-profile-image'>
            <input 
                type='file'
                onChange={e => updateProfile(e)} 
                hidden
                ref={inputEl}
                alt = 'shop-profile'
            />
            <img 
                className='shop-profile-image-tag'
                src={ user.image ? user.image : url}
                alt='shop-profile'
                onClick={()=>inputEl.current.click()}
            />
        </div>

        <div className='shop-profile-info'>

            <div className='shop-profile-info-detail'>
                  <label>Shop : </label>
                  <input type='text' disabled value={user.shopname} />
              </div>

              <div className='shop-profile-info-detail'>
                  <label>Name : </label>
                  <input type='text' disabled value={name} />
              </div>
              <div className='shop-profile-info-detail'>
                  <label>Phone : </label>
                  <input type='text' disabled value={user.phone} />
              </div>

        </div>

        {user.isShopOn==='YES' ?  
                <button className='shop-profile-online' type='button' onClick={(e)=>offline(e)}><strong>Online</strong></button>
            : 
                <button className='shop-profile-offline' type='button' onClick={(e)=>online(e)} ><strong>Offline</strong></button>
            }
        
        <div className='shop-profile-button'>
            <button className='shop-profile-button-back' type='button' onClick={(e)=>back(e)}><ArrowBackIosNewIcon fontSize='large'/></button>
            <button className='shop-profile-button-out' type='button' onClick={()=>logout()}><ExitToAppIcon fontSize='large'/></button>
        </div>

    </div>
  )
}

export default Profile