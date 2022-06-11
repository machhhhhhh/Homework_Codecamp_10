import React, { useState , useEffect } from 'react'
import Header from '../dashboard/Header'
import axios from '../../config/axios'
import {withRouter} from 'react-router-dom'
import Navbars from '../friend/Navbars'
import '../css/friend/friend.css'
import Friends from '../friend/Friend'
import {ALL_FRIEND ,REQUEST_FRIEND, PENDING_FRIEND, FIND_FRIEND} from '../../config/data'

function Friend() {

    const [user,setUser] = useState([])
    const [mode, setMode] = useState(ALL_FRIEND)
    const [toggleFetch, setToggleFetch] = useState(false)

    useEffect(()=>{

        const fetchFriend = async() => {
            
            try {
                let result
                if(mode === ALL_FRIEND){
                    result = await axios.get('/friend?status=ACCEPTED')
                } 
                else if (mode === REQUEST_FRIEND){
                    result = await axios.get('/friend?status=REQUESTED')
                }
                else if (mode === FIND_FRIEND) {
                    result = await axios.get('/friend/unknown')
                }
                else if (mode === PENDING_FRIEND){
                    result = await axios.get('/friend')
                }
                
                setUser(result.data)
    
            } catch (error) {
                console.error(error);
            }

        }

        fetchFriend()
        // console.log(user);


    },[mode,toggleFetch])

    const changeMode = (mode) => {setMode(mode)}

  return (
    <div className='friends'>
        <Header/>
        <div className='friends-body'>
            <Navbars changeMode = {changeMode} />
            <Friends 
                friends = {user} 
                mode = {mode}  
                setToggleFetch = {setToggleFetch}
                />
        </div>
    </div>
  )
}

export default withRouter(Friend)