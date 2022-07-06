import React, {useEffect, useState} from 'react'
import '../components/css/login.css'
import {useNavigate} from 'react-router-dom'
import axios from '../config/axios'
import LocalStorageService from '../service/LocalStorageService'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Login({setRole}) {


  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [space, setSpace] = useState(false)
  const [error, setError] = useState(false)

  const register = async(e) => {
    try {
      e.preventDefault()
      return navigate('/register')
    } catch (error) {
      console.error(error)
    }
  }

  const login = async(e) => {
    
    try {
      e.preventDefault()
      if(username ==='' || password === '') {
        // alert('must type e-mail and password')
        setSpace(true)
        setError(false)
        return;
      }
      
      const body = {
        username : username,
        password : password
      }
  
      const result = await axios.post('/user', body)
      if(!result) {
        alert('cannot login')
        return;
      }
      // console.log(result.data)
      
      LocalStorageService.setToken(result.data.token)
      
      setRole(result.data.message)
      
      setPassword('')
      setUsername('')
      
      // reload()
      // setLogin(prev=>!prev)

    } catch (error) {
      setError(true)
      setSpace(false)
      // console.error(error)
    }

  }

  return (
        <div className='login'>
          <div className='login-logo'>
            <img 
              className='login-logo-image'
              src='https://res.cloudinary.com/drnmadwqu/image/upload/v1655873717/logo_vd9prv.png' 
              alt='app-logo'
              />
          </div>

            <h1>SMART REPAIR <br></br>SHOP SEARCH</h1>

            <form className = 'login-form-header'>
                <div className='login-form'>
                  <input 
                      placeholder='username' 
                      type='email'
                      value={username}
                      onChange={ e => setUsername(e.target.value)}  
                    />

                  <input 
                      placeholder='password'
                      type='password' 
                      value={password}
                      onChange= {e => setPassword(e.target.value)}
                      />
                </div>

                {space && <h2 className='login-error'>Please type e-mail and password</h2>}
                {error && <h2 className='login-error'>username or password <br></br> not correct</h2>}

                <button type='submit' onClick={e=>login(e)}><ExitToAppIcon fontSize='large'/></button>
            </form>

            <h3>No Account ? <span onClick={(e)=>register(e)}>Register</span></h3>
      </div>
  )
}

export default Login