import React, { useEffect, useState } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import LocalStorageService from '../service/LocalStorageService'

import Index from '../page/Index'
import Login from '../page/Login'
import Register from '../page/Register'
import Home from '../page/home'
import axios from 'axios'

function PrivateRoute(props) {

    const role = props.role || 'guest' 
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        if(role === 'guest') navigate('/login')
        if(role === 'customer') navigate('/index')
        if(role === 'shop') navigate('/home')
        

        const fetchUser = async () => {
            
            const result = await axios.get('/user')
            setUser(result.data)

        }

        if(role!=='guest') fetchUser()

    },[role])


    const logout = async() => {
        props.setRole('guest')
        LocalStorageService.removeToken()
      }


  return (
    <Routes>


        {role==='guest' && (
            <>
                <Route path='/login' element={<Login setRole={props.setRole}  role= {role} /> }  exact />
                <Route path='/register' element={<Register/>}  exact/>
                
            </>
        )}

        {role ==='customer' && (
            <>
                <Route path='/index' element={<Index logout={logout} user = {user}  />} exact/>
            </>
        )}


        {role ==='shop' && (
            <>
                <Route path='/home' element={<Home logout={logout} user = {user}  />} exact />
            </>
        )}


    </Routes>
  )
  
}

export default PrivateRoute