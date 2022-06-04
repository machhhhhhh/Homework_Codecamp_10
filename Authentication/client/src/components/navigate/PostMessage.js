import React from 'react'
import '../css/message.css'
import {Avatar} from '@mui/material'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoIcon from '@mui/icons-material/Photo';
import MoodIcon from '@mui/icons-material/Mood';

function PostMessage() {

    const handleSubmit = e => {
        // e.preventDefault()
    }

  return (
    <div className='message'>

        <div className='message_top'>
            <Avatar src=""/>
            <form>
                <input 
                    type='text'
                    className='message_input'
                    placeholder={`What's on your mind.`}
                />
                <button type='submit' onClick={e => handleSubmit(e)} >Send</button>
            </form>
        </div>

        <div className='message_bottom'>
            <div className='message_option'>
                <VideoCameraFrontIcon style={{color : 'red'}} fontSize='large'/>
                <h3>Live Video</h3>
            </div>
            <div className='message_option'>
                <PhotoIcon style={{color : 'green'}} fontSize='large'/>
                <h3>Photo/Video</h3>
            </div>
            <div className='message_option'>
                <MoodIcon style={{color : 'gold'}} fontSize='large'/>
                <h3>Feeling/Activity</h3>
            </div>
            
        </div>
    </div>
  )
}

export default PostMessage