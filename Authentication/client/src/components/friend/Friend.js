import React from 'react'
import { Link } from 'react-router-dom'
import '../css/friend/feed.css'
import FriendForm from './FriendForm'

function Friend({friends, mode, setToggleFetch}) {

  return (
    <div className='friend-feed'>
        <div className='friend-feed-detail'>

            {friends.map(friend => (
                <Link to={{
                  pathname : '/user',
                  state : {
                    user_id : friend.id
                  }
                }}>
                    <FriendForm 
                      key={friend.id} 
                      friend = {friend} 
                      mode = {mode} 
                      setToggleFetch = {setToggleFetch}
                      />
                </Link>
            ))}

        </div>
    </div>
  )
}

export default Friend