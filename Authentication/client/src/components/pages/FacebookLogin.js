import React, {useState} from 'react'
import '../css/login.css'
import axios from '../../config/axios'
import {notification} from 'antd'
import localStorageservice from '../../services/localStorageservice'

function FacebookLogin(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        const body = {
            username : username,
            password : password
        }

        await axios.post('/user/login', body)
            .then(result=>{
                notification.success({
                    message: `${username} has login`,
                  });
                localStorageservice.setToken(result.data.token)
                props.setRole('user')

            })
            .catch(err=> {
                notification.error({
                    message: `Username or Password not correct`,
                  });
            })

    }


  return (
    <div className='login'>
        <div className='login-logo'>
            <img src='https://blogs.icrc.org/th/wp-content/uploads/sites/104/2022/02/facebook-icon.png' alt='logo' />
            <img src='https://www.webdesignerdepot.com/cdn-origin/uploads/2015/07/featured_facebook.jpg' alt='word' />
        </div>

        <form>
            <input 
                className='username'
                type='text'
                name='username'
                placeholder='username'
                onChange={e => setUsername(e.target.value)}
            />
            <input 
                className='password'
                type='password'
                name='password'
                placeholder='password'
                onChange={e => setPassword(e.target.value)}
            />
            <button type='submit' onClick={login}>SignIn</button>
        </form>

    </div>
  )
}

export default FacebookLogin