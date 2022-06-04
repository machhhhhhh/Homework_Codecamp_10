import {  notification } from 'antd';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import LocalStorageservice from '../../services/localStorageservice';
// import axios from '../../config/axios'
import jwtDecode from 'jwt-decode'

import Header from '../navigate/Header'
import Sidebar from '../navigate/Sidebar'
import Feed from '../navigate/Feed';
import '../css/header.css'

export default function Dashboard(props) {

    // let userLogin
    // let allUser
    // let user
    const [user,setUser] = useState([])

    const logout = () => {
        LocalStorageservice.removeToken()
        props.setRole('guest')
        notification.success({
            message: "Logout"
        })
    }

    // async function getUser(){
    //     const response = await axios.get('/user')
    //     allUser = response.data
    //     const token = LocalStorageservice.getToken()
    //     userLogin = jwtDecode(token)
    //     user = allUser.filter(person => person.id===userLogin.id)
    //     // console.log(JSON.stringify(user));
    //     const jsonstringuser = JSON.stringify(user)
    //     console.log(jsonstringuser);
    //     // jsonstringuser.map(user => console.log(user))
    // }

    useEffect(()=>{
        // getUser()
        const token = LocalStorageservice.getToken()
        const userLogin = jwtDecode(token)
        // console.log(user);
        setUser(userLogin)
        // console.log(user);
    },[])


    return (
        <div className='dashboard'>
            {/* <h2>Profile</h2>
            <p>
                <strong>Name:</strong> {user.firstname}
                <br />
                <strong>User ID:</strong> {user.id}
            </p> */}

            <Header user = {user} logout={logout}/>

            <div className="content">
                <Sidebar user = {user}/>
                <Feed    />
                {/* <Widgets /> */}
            </div>

        </div>
    );
}