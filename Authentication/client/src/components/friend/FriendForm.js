import React from 'react'
import axios from '../../config/axios';
import {ALL_FRIEND, REQUEST_FRIEND,FIND_FRIEND, PENDING_FRIEND} from '../../config/data'
import '../css/friend/friendForm.css'

const URL = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'
function FriendForm({friend, mode, setToggleFetch}) {


    const unFriend = async(e) => {
        try {
            e.preventDefault()

            let check

            if(mode === ALL_FRIEND) check = window.confirm("Unfriend ??")
            else check = window.confirm('Cancel ??')

            if(check){
                const body = {
                    friend_id : friend.id
                }
                await axios.post(`/friend/unfriend`,body)
            }
            
            return setToggleFetch(prev => !prev)

            
        } catch (error) {
            console.error(error)
        }
    }

    const addFriend = async (e) => {
        try {

            e.preventDefault()
            const body = {
                target_id : friend.id
            }

            await axios.post('/friend', body)

            setToggleFetch(prev => !prev)
        } catch (error) {
            console.error(error)
        }
    }

    const acceptFriend = async(e) => {
        try {
            
            e.preventDefault()

            const body = {
                friend_id : friend.id
            }
            await axios.post(`/friend/accept`, body)
            setToggleFetch(prev => !prev)

        } catch (error) {
            console.error(error)
        }
    }




  return (
    <div className='friend-form'>
        <img src={friend.image?friend.image : URL} alt='friendPhoto' />
        <div className='friend-form-info'>
            <h2>{friend.firstname} {friend.lastname} </h2>
            <div className='friend-form-info-button'>

            {(mode===REQUEST_FRIEND) && (
                <>
                    <button className='button-accept' onClick={(e)=>acceptFriend(e)}><strong>Accept</strong></button>
                    <button className='button-cancel' onClick={(e)=>unFriend(e)}><strong>Cancel</strong></button>
                </>
            )}

            {(mode===ALL_FRIEND) && (
                    <button className='button-unfriend' onClick={(e)=>unFriend(e)} ><strong>Unfriend</strong></button>
            )}

            {(mode===FIND_FRIEND)&& (
                  <button className='button-addfriend' onClick={(e)=>addFriend(e)}><strong>Add</strong></button>  
            )}

            {(mode===PENDING_FRIEND) && (
                    <button className='button-cancel' onClick={(e)=>unFriend(e)}><strong>Cancel</strong></button>
            )}

            </div>
        </div>
    </div>
  )
}

export default FriendForm