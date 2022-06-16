import React, { useEffect, useState } from 'react'
// import {useLocation} from 'react-router-dom'
import Header from '../dashboard/Header'
import axios from '../../config/axios'
import Users from '../profile/User'
import '../css/user.css'

function User(props) {

    // const location = useLocation()
    const [user, setUser] = useState([])
    const [check, setCheck] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(()=>{

        const fetchUser = async() => {

            try {
                // const {user_id} = location.state
                // if(!user_id) alert('No User')
                // if else
                const user_id = 10
                const result = await axios.get(`/user/${user_id}`)
                console.log(result.data);
                setCheck(result.data.check)
                setUser(result.data.user)

            } catch (error) {
                console.error(error)
            }
        }

        fetchUser()
        

    },[refresh])

    return (
        <div className='users'>
            <Header setRole = {props.setRole} user = {props.user} />
            <Users  user = {user} check = {check} />
        </div>
  )
}

export default User