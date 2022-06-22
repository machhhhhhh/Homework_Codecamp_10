import React, {useState} from 'react'
import '../components/css/login.css'
import {useNavigate} from 'react-router-dom'
import axios from '../config/axios'
import LocalStorageService from '../service/LocalStorageService'

function Login({setRole}) {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async(e) => {
    e.preventDefault()
    if(username ==='' || password === '') {
      alert('must type e-mail and password')
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
    console.log(result.data)
    LocalStorageService.setToken(result.data.token)

    setPassword('')
    setUsername('')
    if(result.data.message === 'customer') {
      setRole('customer')
       return navigate('/index')
    }
    if(result.data.message === 'shop') {
      setRole('shop')
      return navigate('/home')
    }

  }

  return (
        <div className='login'>
          <div className='login-logo'>
            <img 
              src='https://res.cloudinary.com/drnmadwqu/image/upload/v1655873717/logo_vd9prv.png' 
              alt='app-logo'
              />
          </div>

            <h1>SMART REPAIR <br></br>SHOP SEARCH</h1>

            <form className>
                <div className='login-form'>
                  <input 
                      placeholder='username' 
                      type='text'  
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
                <button onClick={e=>login(e)}>Login</button>
            </form>

            <h3>No Account ? <span onClick={()=>navigate('/register')}>Register</span></h3>
      </div>
  )
}

export default Login