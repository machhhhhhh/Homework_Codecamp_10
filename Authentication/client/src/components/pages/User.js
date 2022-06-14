import React, { useEffect, useState } from 'react'
import {Redirect, useLocation , useHistory } from 'react-router-dom'
import Header from '../dashboard/Header'
import axios from '../../config/axios'
import Users from '../profile/User'

const url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'

function User(props) {

    const location = useLocation()
    const history = useHistory()
    const [user, setUser] = useState([])
    const [check, setCheck] = useState(null)

    useEffect(()=>{

        const fetchUser = async() => {

            try {
                const {user_id} = location.state
                if(!user_id) return <Redirect to='/dashboard' />
                // const user_id = 2
                const result = await axios.get(`/user/${user_id}`)
                console.log(result.data);

            } catch (error) {
                console.error(error)
            }
        }

        fetchUser()
        

    },[check])

    return (
        <div className='user'>
            <Header setRole = {props.setRole} user = {props.user} />
            <Users />
        </div>
  )
}

export default User