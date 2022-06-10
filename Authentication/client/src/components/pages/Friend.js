import React, { useState , useEffect } from 'react'
import Header from '../dashboard/Header'
import {notification} from 'antd'
import LocalStorageservice from '../../services/localStorageservice'
import axios from '../../config/axios'
import jwtDecode from 'jwt-decode'
import {withRouter} from 'react-router-dom'
import Navbars from '../friend/Navbars'
import '../css/friend/friend.css'
import Friends from '../friend/Friend'

function Friend(props) {

    const [user,setUser] = useState([])

    const logout = async () => {
        
        LocalStorageservice.removeToken()
        props.setRole('guest')
        notification.success({
            message: "Logout"
        })

        // props.history.push('/login')
        // await axios.get('/user/logout')
        // .then(res => {
            
        //     })
        //     .catch(err => console.error(err))
    }

    useEffect( async ()=>{
        // getUser()
        // const userLogin = jwtDecode(token)
        // console.log(user);
        // setUser(userLogin)
        // console.log(user);
        // console.log(jwtDecode(token));
        
        const token = LocalStorageservice.getToken()
        const result = await axios.get('/user')
        const data = result.data
        const profile = data.filter(user => user.id === jwtDecode(token).id)
        profile.map(user => {
            return setUser(user)
        })

        

    },[])

  return (
    <div className='friends'>
        <Header user = {user} logout={logout}/>
        <div className='friends-body'>
            <Navbars/>
            <Friends/>
        </div>
    </div>
  )
}

export default withRouter(Friend)