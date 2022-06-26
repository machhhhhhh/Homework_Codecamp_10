import React, { useState } from 'react'
import '../components/css/register.css'
import {useNavigate} from 'react-router-dom'
import axios from '../config/axios'
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Register() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')


  const register = async(e) => {
    try {

        e.preventDefault()
        if(username==='' ){
          alert('Please type username')
          return;
        }
        if(password==='' ){
          alert('Please type password')
          return;
        }
        if(confirm==='' ){
          alert('Please type confirm password')
          return;
        }
        if(firstname==='' ){
          alert('Please type firstname')
          return;
        }
        if(lastname==='' ){
          alert('Please type lastname')
          return;
        }
        if(phone==='' ){
          alert('Please type phone number')
          return;
        }

        if(password !== confirm){
          alert('password and confirm password not match')
          return;
        }

        const body = {
          username : username,
          password : password,
          firstname : firstname,
          lastname : lastname,
          phone : phone
        }

        const user = await axios.post('/customer/register', body)
        if(!user) {
          alert('cannot create user')
          return;
        }

        return navigate('/login')

    } catch (error) {
        console.error(error)
    }
  }

  const back = async(e) => {
    try {
      e.preventDefault()
      setUsername('')
      setPassword('')
      setConfirm('')
      setFirstname('')
      setLastname('')
      setPhone('')

      return navigate('/login')

    } catch (error) {
      
    }
  }

  return (
    <div className='register'>
      <div className='register-logo'>
            <img 
              className='register-logo-image'
              src='https://res.cloudinary.com/drnmadwqu/image/upload/v1655873717/logo_vd9prv.png' 
              alt='app-logo'
              />
      </div>

      <form className='register-form-header'>
          <div className='register-form'>
              <input 
                  placeholder='Username' 
                  value={username} 
                  onChange={(e)=>setUsername(e.target.value)}
                  type='email'
                />
              <input 
                  placeholder='Password' 
                  value={password}  
                  onChange={(e)=>setPassword(e.target.value)} 
                  type='password'
                />
              <input 
                  placeholder='Confirm Password' 
                  value={confirm} 
                  onChange={(e)=>setConfirm(e.target.value)} 
                  type='password'
                />
              <input 
                  placeholder='Firstname' 
                  value={firstname} 
                  onChange={(e)=>setFirstname(e.target.value)}
                  type='text' 
                />
              <input 
                  placeholder='Lastname' 
                  value={lastname} 
                  onChange={(e)=>setLastname(e.target.value)} 
                  type='text'
                />
              <input 
                  placeholder='Phone' 
                  value={phone} 
                  onChange={(e)=>setPhone(e.target.value)} 
                  type='text'
                />
          </div>
          <div className='button'>
            <button type='button' className='button-back' onClick={(e)=>back(e)}><ArrowBackIcon fontSize='large'/></button>
            <button className='button-submit' type='submit' onClick={(e)=>register(e)}><CheckIcon fontSize='large' /></button>
          </div>
      </form>
    </div>
  )
}

export default Register