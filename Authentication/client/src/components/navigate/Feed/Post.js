import React, { useState } from 'react'
import '../../css/post.css'
import {Avatar} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../../config/axios';

function Post({profile, image, username, timestamp, message, user, reload, post}) {
    
    const [input, setInput] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    const deletePost = async() => {
        const check = window.confirm("Are you sure ???")
        if (check) {
            await axios.delete(`/post/${post.id}`)
        }
        reload()
    }
    
    const editPost = async (e) => {
        e.preventDefault()
        const body = {
            description: input 
            // photo : ,
            // emotion : 
        }

        await axios.put(`/post/${post.id}`, body)
        setInput("")
        setIsEdit(false)
        reload()
        console.log('edit');
    }
    const toggleEdit = () => {
        setInput(message)
        setIsEdit(true)
    }

    let content = (
        <div className='post'>
            <div className='post_top'>
            <div className='post-info'>
                <Avatar src={profile} className='avatar'/>
                <div className='post_topInfo'>
                    <h3>{username}</h3>
                    <p>{timestamp}</p>
                </div>
            </div>
            <div className='button'>
                { (user.id === post.User.id) ?
                    <>
                    <button onClick={()=> toggleEdit()}><EditIcon style={{color : 'blue'}} /></button>
                    <button onClick={(e)=>deletePost(e)}><DeleteIcon style={{color : 'red'}}/></button>
                    </>
                 : 
                 <>
                     {/* <h1>Can't Edit and Del</h1> */}
                 </>
                 }
            </div>

        </div>
        <div className='post_bottom'>
              {message}
            </div>
        <div className='post_image'>
              {image && <img src={image} alt="post" />}
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

    if (isEdit){
        content = (
        <div className='post'>
            <div className='post_top'>
            <div className='post-info'>
                <Avatar src={profile} className='avatar'/>
                <div className='post_topInfo'>
                    <h3>{username}</h3>
                    <p>{timestamp}</p>
                </div>
            </div>

        </div>
        <div className='post_bottom'>
            <form>
                <input 
                    type='text'
                    className='message-input'
                    placeholder={`What's on your mind.`}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type='submit' onClick={(e) => editPost(e)} >Send</button>
            </form>
            </div>
        <div className='post_image'>
              {image && <img src={image} alt="post" />}
        </div>


    </div>

            
        )
    }

  return (
    <>
        {content}
    </>
  )
}

export default Post