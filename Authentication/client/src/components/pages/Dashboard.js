import React, {  useEffect, useState } from 'react';
import LocalStorageservice from '../../services/localStorageservice';
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios';
import Header from '../dashboard/Header'
import Sidebar from '../dashboard/Sidebar'
import Feed from '../dashboard/Feed';
import '../css/dashboard/header.css'
import Widgets from '../dashboard/Widgets';
import { withRouter } from 'react-router-dom';

function Dashboard(props) {

    const [user,setUser] = useState([])
    

    const fetchUser = async () => {
            try{
                const token = LocalStorageservice.getToken()
                // console.log(jwtDecode(token))
                // setUser(jwtDecode(token))
                const result = await axios.get('/user')
                const data = result.data
                const profile = data.filter(user => user.id === jwtDecode(token).id)
                profile.map(user => {
                    // console.log(user);
                    return setUser(user)
                })

            } catch(err){
                console.error(err)
            }
    }

    
    
    useEffect( ()=>{
        // getUser()
        // const userLogin = jwtDecode(token)
        // console.log(user);
        // setUser(userLogin)
        // console.log(user);
        // console.log(jwtDecode(token));
        
        fetchUser()
        

    },[])

    


    return (
                <div className='dashboard'>
                    {/* <h2>Profile</h2>
                    <p>
                        <strong>Name:</strong> {user.firstname}
                        <br />
                        <strong>User ID:</strong> {user.id}
                    </p> */}
                    {/* {user} */}

                    <Header setRole={props.setRole} />

                    <div className="content">
                        <Sidebar user = {user}/>
                        <Feed    user = {user}/>
                        <Widgets user = {user}/>
                    </div>

                </div>
    );
}

export default withRouter(Dashboard)