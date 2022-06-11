import React from 'react'
import axios from '../../config/axios';
import {useHistory} from 'react-router-dom'

function FriendForm({friend, check}) {

    const history = useHistory()

    const unFriend = async(e) => {
        try {
            e.preventDefault()

            const check = window.confirm("Unfriend ??")
            if(check){
                const body = {
                    friend_id : friend.id
                }
                await axios.post(`/friend/unfriend`,body)
            }


            return history.push('/friend')
            
        } catch (error) {
            console.error(error)
        }
    }

    const acceptFriend = async () => {
        try {


            
        } catch (error) {
            console.error(error)
        }
    }




  return (
    <div className='friend-form'>
        <img src={friend.image} alt='friendPhoto' />
        <div className='friend-form-info'>
            <h2>{friend.firstname} {friend.lastname} </h2>
            <div className='friend-form-info-button'>

            {(check!==null) ?
                (check) ? 
                    <button className='button-unfriend' onClick={(e)=>unFriend(e)} ><strong>Unfriend</strong></button>
                :
                <>
                    <button className='button-accept' onClick={(e)=>acceptFriend(e)}><strong>Accept</strong></button>
                    <button className='button-reject' onClick={(e)=>unFriend(e)}><strong>Reject</strong></button>
                </>
              :
                <></>
               }
            </div>
        </div>
    </div>
  )
}

export default FriendForm