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

  const [error, setError] = useState(false)
  const [checkUsername, setCheckUsername] = useState(false)
  const [checkpassword, setCheckpassword] = useState(false)
  const [checkConfirm, setCheckConfirm] = useState(false)
  const [checkFirstname, setCheckFirstname] = useState(false)
  const [checkLastname, setCheckLastname] = useState(false)
  const [checkPhone, setCheckPhone] = useState(false)
  const [checkMatching, setCheckMatching] = useState(false)

  const register = async(e) => {
    try {

        e.preventDefault()
        if(username==='' ){
          // alert('Please type username')
          setCheckUsername(true)
        }
        else if(username!=='' ){
          // alert('Please type username')
          setCheckUsername(false)
        }

        if(password==='' ){
          // alert('Please type password')
          setCheckpassword(true)
          // return;
        }
        if(password!=='' ){
          // alert('Please type password')
          setCheckpassword(false)
          // return;
        }

        if(confirm==='' ){
          // alert('Please type confirm password')
          setCheckConfirm(true)
          // return;
        }
        if(confirm!=='' ){
          // alert('Please type confirm password')
          setCheckConfirm(false)
          // return;
        }

        if(firstname==='' ){
          // alert('Please type firstname')
          setCheckFirstname(true)
          // return;
        }
        if(firstname!=='' ){
          // alert('Please type firstname')
          setCheckFirstname(false)
          // return;
        }

        if(lastname==='' ){
          // alert('Please type lastname')
          setCheckLastname(true)
          // return;
        }
        if(lastname!=='' ){
          // alert('Please type lastname')
          setCheckLastname(false)
          // return;
        }


        if(phone==='' ){
          // alert('Please type phone number')
          setCheckPhone(true)
          // return;
        }
        if(phone!=='' ){
          // alert('Please type phone number')
          setCheckPhone(false)
          // return;
        }


        if(password !== confirm){
          // alert('password and confirm password not match')
          setCheckMatching(true)
        }

        if(password === confirm){
          // alert('password and confirm password not match')
          setCheckMatching(false)
        }

        if(username || password || confirm || firstname || lastname || phone ==='' || password !== confirm){
          return ;
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
        // console.error(error)
        // setCheckUsername(false)
        // setCheckpassword(false)
        // setCheckConfirm(false)
        // setCheckFirstname(false)
        // setCheckLastname(false)
        // setCheckPhone(false)
        // setCheckMatching(false)
        setError(true)
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
                {checkUsername && <h1 className='register-error'>Please type your username</h1>}
              <input 
                  placeholder='Username' 
                  value={username} 
                  onChange={(e)=>setUsername(e.target.value)}
                  type='email'
                />

                {checkpassword && <h1 className='register-error'>Please type your password</h1>}
              <input 
                  placeholder='Password' 
                  value={password}  
                  onChange={(e)=>setPassword(e.target.value)} 
                  type='password'
                />

                {checkConfirm && <h1 className='register-error'>Please type confirm password</h1>}
              <input 
                  placeholder='Confirm Password' 
                  value={confirm} 
                  onChange={(e)=>setConfirm(e.target.value)} 
                  type='password'
                />

                {checkFirstname && <h1 className='register-error register-error-firstname'>Please type your first name</h1>}
              <input 
                  placeholder='Firstname' 
                  value={firstname} 
                  onChange={(e)=>setFirstname(e.target.value)}
                  type='text' 
                />

              {checkLastname && <h1 className='register-error'>Please type your last name</h1>}
              <input 
                  placeholder='Lastname' 
                  value={lastname} 
                  onChange={(e)=>setLastname(e.target.value)} 
                  type='text'
                />

              {checkPhone && <h1 className='register-error'>Please type your phone</h1>}
              <input 
                  placeholder='Phone' 
                  value={phone} 
                  onChange={(e)=>setPhone(e.target.value)} 
                  type='text'
                />
              {checkMatching && <h1 className='register-error password-error'>Please type the same password</h1>}
              {error && <h1 className='register-error catch-error'>cannot create user</h1>}

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