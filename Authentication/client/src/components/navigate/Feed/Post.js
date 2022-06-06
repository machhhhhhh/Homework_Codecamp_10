import React from 'react'
import '../../css/post.css'
import {Avatar} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';

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
        <div className='post_bottom'>
              {message}
            </div>
        <div className='post_image'>
              <img src={image} alt="post" />
        </div>


        <div className='post_options'>
            <div className='post_option'>
                <ThumbUpIcon/>
                <p>Like</p>
            </div>
            <div className='post_option'>
                <ChatBubbleIcon/>
                <p>Comment</p>
            </div>
            <div className='post_option'>
                <SendIcon/>
                <p>Share</p>
            </div>
        </div>
    </div>
  )
}

export default Post