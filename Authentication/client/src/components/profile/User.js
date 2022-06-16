import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from '../../config/axios'
import {useHistory} from 'react-router-dom'

const url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'

function User({user, check, setRefresh}) {
  const history = useHistory()

  const profile = async (e) => {
    try {
      if(check !== 'user') return

      return history.push('/profile')

    } catch (error) {
      console.error(error)
    }
  }

  const addFriend = async () => {
    try {

      const body = {
        target_id : user.id
      }

      await axios.post('/friend', body)
      setRefresh(prev=>!prev)

    } catch (error) {
        console.error(error)
    }
  }

  const unFriend = async () => {
    try {

      const check = window.confirm("Are you sure ??!")
      if(!check) {
        return;
      }

      const body = {
        friend_id : user.id
      }
      
      await axios.post('/friend/unfriend', body)
      setRefresh(prev=>!prev)
    } catch (error) {
        console.error(error)
    }
  }

  const acceptFriend = async() => {
    try {

      const body = {
        friend_id : user.id
      }
      await axios.post('/friend/accept', body)
      setRefresh(prev=>!prev)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='user'>
        <img src={user.image ? user.image : url} alt='user' onClick={profile} />
        <div className='user-check'>
            <h1>{user.firstname ? user.firstname : 'No User'} <span> {user.lastname && user.lastname}</span> </h1>
            {check ==="ACCEPT" && (
                <button 
                  className='button-check-unfriend'
                  onClick={unFriend}
                  >
                    <strong>Unfriend</strong>
                </button>
            )}

            {check ==="PENDING" && (
                <button 
                  className='button-check-unfriend'
                  onClick={unFriend}
                  >
                  <strong>Cancel</strong>
                </button>
            )}
            {check ==="REQUEST" && (
              <div className='user-request'>
                <button 
                  className='button-request-accept'
                  onClick={acceptFriend}
                  >
                    <strong> <CheckIcon/></strong> 
                </button>
                <button 
                  className='button-request-remove'
                  onClick={unFriend}
                  >
                    <strong><RemoveIcon/></strong>
                </button>
              </div>
            )}
            {check ==="SEND" && (
                <button 
                  className='button-send'
                  onClick={addFriend}
                  >
                    <strong><AddIcon/></strong>
                </button>
            )}
            

        </div>

    </div>
  )
}

export default User