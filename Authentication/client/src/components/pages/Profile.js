import React ,{useEffect,useState}from 'react'
import Header from '../dashboard/Header'
import LocalStorageservice from '../../services/localStorageservice'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'
import { notification } from 'antd'

function Profile(props) {

    const [user,setUser] = useState([])

    const logout = async () => {
        
        LocalStorageservice.removeToken()
        props.setRole('guest')
        notification.success({
            message: "Logout"
        })

        // fetchUser()

        // props.history.push('/login')
        // await axios.get('/user/logout')
        // .then(res => {
            
        //     })
        //     .catch(err => console.error(err))
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
    

    const fetchUser = async () => {
            const token = LocalStorageservice.getToken()
            // console.log(jwtDecode(token))
            // setUser(jwtDecode(token))
            const result = await axios.get('/user')
            const data = result.data
            const profile = data.filter(user => user.id === jwtDecode(token).id)
            profile.map(user => {
                console.log(user);
                 return setUser(user)
            })
    }

    
    
    useEffect( async ()=>{
        // getUser()
        // const userLogin = jwtDecode(token)
        // console.log(user);
        // setUser(userLogin)
        // console.log(user);
        // console.log(jwtDecode(token));
        
        fetchUser()
        

    },[])


  return (
    <div className='profile'>
        {(user)? 
            <Header uesr = {user} logout = {logout} />

            :   
            <h1>No user</h1>
        }

    </div>
  )
}

export default Profile