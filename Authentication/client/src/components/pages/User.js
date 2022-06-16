import React, { useEffect, useState } from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import Header from '../dashboard/Header'
import axios from '../../config/axios'
import Users from '../profile/User'
import '../css/user.css'

function User(props) {

    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState([])
    const [check, setCheck] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(()=>{

        const fetchUser = async() => {

            try {
                const {user_id} = location.state

                if(user_id === props.user.id) {
                    return history.push('/profile')
                }

                const result = await axios.get(`/user/${user_id}`)
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
            <Users  user = {user} check = {check} setRefresh= {setRefresh} />
        </div>
  )
}

export default User