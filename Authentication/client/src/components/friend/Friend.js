import React from 'react'
import '../css/friend/feed.css'
import FriendForm from './FriendForm'

function Friend({friends, mode, setToggleFetch}) {

  return (
    <div className='friend-feed'>
        <div className='friend-feed-detail'>

            {friends.map(friend => (
                <FriendForm 
                  key={friend.id} 
                  friend = {friend} 
                  mode = {mode} 
                  setToggleFetch = {setToggleFetch}
                  />
            ))}

        </div>
    </div>
  )
}

export default Friend