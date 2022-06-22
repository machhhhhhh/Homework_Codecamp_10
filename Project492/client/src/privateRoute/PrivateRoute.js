import React, { useEffect, useState } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import LocalStorageService from '../service/LocalStorageService'

import Index from '../page/Index'
import Login from '../page/Login'
import Register from '../page/Register'
import Home from '../page/home'

function PrivateRoute(props) {

    const role = props.role || 'guest' 
    const navigate = useNavigate()

    useEffect(()=>{
        if(role === 'guest') navigate('/')
        if(role === 'customer') navigate('/index')
        if(role === 'shop') navigate('/home')

    },[role])

    const logout = async() => {
        props.setRole('guest')
        LocalStorageService.removeToken()
        navigate('/')
      }

    // const [role, setRole] = useState('guest')

  return (
    <Routes>


        {role==='guest' && (
            <>
                <Route path='*' element={<Login setRole={props.setRole}  /> }  exact />
                <Route path='/' element={<Login setRole={props.setRole}  /> }  exact />
                <Route path='/register' element={<Register/>}  exact/>
                
            </>
        )}

        {role ==='customer' && (
            <>
                <Route path='*' element={<Index logout={logout} />} exact/>
                <Route path='/index' element={<Index logout={logout} />} exact/>
            </>
        )}


        {role ==='shop' && (
            <>
                <Route path='*' element={<Home logout={logout} />} exact />
                <Route path='/home' element={<Home logout={logout} />} exact />
            </>
        )}


    </Routes>
  )
  
}

export default PrivateRoute