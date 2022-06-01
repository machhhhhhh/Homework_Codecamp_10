import { Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LocalStorageservice from '../../services/localStorageservice';
// import axios from '../../config/axios'
import jwtDecode from 'jwt-decode'

import Header from './Header'

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
        <div>
            {/* <h2>Profile</h2>
            <p>
                <strong>Name:</strong> {user.firstname}
                <br />
                <strong>User ID:</strong> {user.id}
            </p> */}
            {/* <Link to= '/list'><Button>Todolist</Button></Link> */}
            {/* <br></br> */}


            <Header />

            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
