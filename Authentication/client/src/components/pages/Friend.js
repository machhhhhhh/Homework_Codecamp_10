import React, { useState , useEffect } from 'react'
import Header from '../dashboard/Header'
import axios from '../../config/axios'
import {withRouter} from 'react-router-dom'
import Navbars from '../friend/Navbars'
import '../css/friend/friend.css'
import Friends from '../friend/Friend'
import {ALL_FRIEND ,REQUEST_FRIEND} from '../../config/data'

function Friend() {

    const [user,setUser] = useState([])
    const [mode, setMode] = useState(ALL_FRIEND)
    const [checkFriend, setCheck] = useState(null)

    useEffect(()=>{

        const fetchFriend = async() => {
            
            try {
                let result
                if(mode === ALL_FRIEND){
                    result = await axios.get('/friend?status=ACCEPTED')
                    setCheck(true)
                } 
                else if (mode === REQUEST_FRIEND){
                    result = await axios.get('/friend?status=REQUESTED')
                    setCheck(false)
                }
                else {
                    result = await axios.get('/friend/unknown')
                    setCheck(null)
                }
                console.log(result.data)
                setUser(result.data)
    
            } catch (error) {
                console.error(error);
            }

        }

        fetchFriend()
        // console.log(user);


    },[mode])

    const changeMode = (mode) => {setMode(mode)}

  return (
    <div className='friends'>
        <Header/>
        <div className='friends-body'>
            <Navbars changeMode = {changeMode} />
            <Friends friends = {user} check = {checkFriend} />
        </div>
    </div>
  )
}

export default withRouter(Friend)