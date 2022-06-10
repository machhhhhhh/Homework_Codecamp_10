import React, { useEffect, useState } from 'react'
import axios from '../../config/axios';

function FriendForm({currentUser, friend,isFriend, reload}) {

    const [data, setData] = useState([])

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
            
            reload()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(async()=>{
        try {
            const result = await axios.get('/friend?status=REQUESTED')
            console.log(currentUser);
            const data = result.data
            setData(data)

        } catch (error) {
            console.error(error);
        }
    },[])

  return (
    <div className='friend-form'>
        <img src={friend.image} />
        <div className='friend-form-info'>
            <h2>{friend.firstname} {friend.lastname} </h2>
            <div className='friend-form-info-button'>



            {/* {friends && friends.map(friend => (
                (friend.sender_id === currentUser.id || friend.receiver_id === currentUser.id) ?
                        <h1>Waiting for check</h1>
                    :
                        <h1>Not request friend yet</h1>
            ))} */}


            {/* { friends && friends.map(friend => (




                (friend.sender_id === currentUser.id || friend.receiver_id === currentUser.id )? 
                        (friend.status == "ACCEPTED") ? 
                                <h1>Unfriend</h1>
                            :
                            (friend.receiver_id === currentUser.id) ? 
                                    <h1>you can accept or reject</h1>
                                :
                                    <h1>Pending</h1>
                    :
                        <h1>Not Friend</h1>

             ))} */}
                {(isFriend) ? 
                    <button className='button-unfriend' onClick={(e)=>unFriend(e)} ><strong>Unfriend</strong></button>
                    :
                    <>
                        <button className='button-accept'><strong>Accept</strong></button>
                        <button className='button-reject'><strong>Reject</strong></button>
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export default FriendForm