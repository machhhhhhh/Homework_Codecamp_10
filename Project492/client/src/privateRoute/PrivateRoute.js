import React, { useEffect, useState } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import LocalStorageService from '../service/LocalStorageService'
import axios from '../config/axios'

import Index from '../page/Index'
import Login from '../page/Login'
import Register from '../page/Register'
import Home from '../page/home'

import CustomerProfile from '../components/customer/page/profile'

function PrivateRoute(props) {

    const role = props.role || 'guest' 
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        if(role === 'guest') navigate('/login')
        if(role === 'customer') navigate('/index')
        if(role === 'shop') navigate('/home')
        

        const fetchUser = async () => {
            
            try {
                const result = await axios.get('/user')
                setUser(result.data)
            } catch (error) {
                console.error(error)
            }

        }

        if(role!=='guest') fetchUser()

    },[role])


    const logout = async() => {
        props.setRole('guest')
        LocalStorageService.removeToken()
        return navigate('/login')
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
                <Route path='/index' element={<Index user = {user}  />} exact/>
                <Route path='/customer-profile' element={<CustomerProfile logout={logout} user = {user}  />} exact/>
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