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
        if(role === 'guest') navigate('/')
        if(role === 'customer') navigate('/index')
        if(role === 'shop') navigate('/home')

        console.log(role);

        // const fetchUser = async () => {
        //     const result = await axios.get('/user')
        //     console.log(result);
        // }

        // if(role!=='guest') fetchUser()

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
                <Route path='*' element={<Login role ={role} setRole={props.setRole}  /> }  exact />
                <Route path='/' element={<Login setRole={props.setRole}  role= {role} /> }  exact />
                <Route path='/register' element={<Register/>}  exact/>
                
            </>
        )}

        {role ==='customer' && (
            <>
                <Route path='*' element={<Index role = {role} logout={logout} user = {user} />} exact/>
                <Route path='/index' element={<Index  role = {role} logout={logout} user = {user} />} exact/>
            </>
        )}


        {role ==='shop' && (
            <>
                <Route path='*' element={<Home logout={logout} user = {user} />} exact />
                <Route path='/home' element={<Home logout={logout}  user = {user}/>} exact />
            </>
        )}


    </Routes>
  )
  
}

export default PrivateRoute