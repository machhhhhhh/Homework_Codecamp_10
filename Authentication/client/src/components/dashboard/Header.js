import React ,{useState, useEffect}from 'react'
import '../css/dashboard/header.css'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
// import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import IconButton from '@mui/material/IconButton';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import {Avatar} from '@mui/material'
import { useHistory } from 'react-router-dom';
import LocalStorageservice from '../../services/localStorageservice';
import axios from '../../config/axios';
import { notification } from 'antd';
import jwtDecode from 'jwt-decode';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {

    const [user, setUser]= useState([])

    let history = useHistory()


    const profile = () => {
        try {
            return history.push('/profile')
        } catch (error) {
            console.error(error)
        }
    }

    const home = () => {
        try{
            return history.push('/dashboard')
        } catch(err) {
            console.error(err)
        }
    }

    const logout = async () => {
        
        try {
            LocalStorageservice.removeToken()
            // props.setRole('guest')
            notification.success({
                message: "Logout"
            })

            // fetchUser()
            return history.push('/login')
        } catch (error) {
            console.error(error)
        }

        // props.history.push('/login')
        // await axios.get('/user/logout')
        // .then(res => {
            
        //     })
        //     .catch(err => console.error(err))
    }

    // async function getUser(){
    //     const response = await axios.get('/user')
    //     // allUser = response.data
    //     const token = LocalStorageservice.getToken()
    //     userLogin = jwtDecode(token)
    //     user = allUser.filter(person => person.id===userLogin.id)
    //     // console.log(JSON.stringify(user));
    //     const jsonstringuser = JSON.stringify(user)
    //     console.log(jsonstringuser);
    //     // jsonstringuser.map(user => console.log(user))
    // }
    

    const fetchUser = async () => {
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
        <div className='header'>
            <div className='header_left' >

                        <IconButton onClick={home}>
                            <FacebookRoundedIcon style={{color : 'blue'}} fontSize ='large'/>
                        </IconButton>
                
                <div className='header_input'>
                    <SearchIcon />
                    
                    <input 
                        type='text' 
                        placeholder='Search Facebook'
                        />
                </div>


            </div>


            <div className='header_center'>
                <div className='header_option header_option--active'>
                    <HomeIcon fontSize='large' />
                </div>
                <div className='header_option'>
                    <OndemandVideoIcon fontSize='large'/>
                </div>
                <div className='header_option'>
                    <StorefrontIcon fontSize='large'/>
                </div>
                <div className='header_option'>
                    <GroupsRoundedIcon fontSize='large'/>
                </div>
                <div className='header_option'>
                    <SportsEsportsIcon fontSize='large'/>
                </div>
            </div>
            <div className='header_right' >
                <div className='header_info' onClick={()=>profile()} >
                    <Avatar src={user.image} />
                    <span>{user.firstname} {user.lastname}</span>
                </div>

                <IconButton>
                    <MenuRoundedIcon fontSize='large'/>
                </IconButton>
                <IconButton>
                    <ForumRoundedIcon fontSize='large'/>
                </IconButton>
                <IconButton>
                    <NotificationsRoundedIcon fontSize='large'/>
                </IconButton>
                <IconButton>
                    <ArrowDropDownCircleIcon fontSize='large'/>
                </IconButton>
                <IconButton>
                    <LogoutIcon fontSize='large' style={{color : 'red'}} onClick ={()=>logout()}/>
                </IconButton>
            </div>
        </div>
    )
}

export default Header