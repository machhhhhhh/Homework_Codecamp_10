import React, { useState , useRef} from 'react'
import axios from '../../config/axios'
import '../css/profile.css'
import {useHistory} from 'react-router-dom'

const url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'

function Profile({user}) {

    const history = useHistory()
    const inputEl = useRef()

    const [image, setImage] = useState(null)

    
            const cancle = async () => {
                setImage(null)
                history.push('/dashboard')
            }
            
            const updateProfile = async (e) => {
                
                try {
                    
                    e.preventDefault()
                    const formData = new FormData()
                    formData.append('profileImg',image)

                    await axios.put(`/user/profile`, formData)
                    return window.location.reload()
            
                } catch (error) {
                    console.error(error)
                }



    }


  return (
    <div className='profile-header'>
        <form>
            <div className='profile-image'>
                <input type='file' 
                    onChange={e => setImage(e.target.files[0])} 
                    ref={inputEl}
                    hidden
                    alt='profile'
                    />
                <img 
                    src={image? URL.createObjectURL(image) : user.image ? user.image : url} 
                    onClick={()=>inputEl.current.click()}
                    alt='profileImage'
                    />
            </div>

            <div className='profile-info'>
                <div className='profile-info-username profile-space'>
                    <label >E-mail : </label>
                    <input disabled value={user.username}  />
                </div>
                <div className='profile-info-firstname profile-space'>
                    <label >First Name :</label>
                    <input  value={ user.firstname } disabled  />
                </div>
                <div className='profile-info-lastname profile-space'>
                    <label >Last Name :</label>
                    <input  value={ user.lastname} disabled />
                </div>
                <div className='profile-info-phone profile-space'>
                    <label >Phone : </label>
                    <input  value={user.phone} disabled/>
                </div>
                    <button className='button-update profile-space' type='submit' onClick={(e)=>updateProfile(e)} disabled={!image}><strong>Update</strong></button>
                    <button className='button-back profile-space' type='submit' onClick={()=>cancle()}><strong>back</strong></button>
            </div>
            
        </form>
    </div>
  )
}

export default Profile