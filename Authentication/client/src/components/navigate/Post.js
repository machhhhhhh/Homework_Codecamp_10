import React from 'react'
import '../css/post.css'
import {Avatar} from '@mui/material'

function Post({profile, image, username, timestamp, message}) {
  return (
    <div className='post'>
        <div className='post_top'>
            <Avatar src={profile} className='avatar'/>
            <div className='post_topInfo'>
                <h3>{username}</h3>
                <p>timestamp</p>
            </div>
        </div>
    </div>
  )
}

export default Post