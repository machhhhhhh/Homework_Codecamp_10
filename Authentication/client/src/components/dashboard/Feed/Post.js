import React, { useEffect, useState } from 'react'
import '../../css/dashboard/post.css'
import {Avatar} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../../config/axios';
import Comment from './Comment'
import timeSince from '../../../config/timeSince'

function Post({profile, image, username, timestamp, message, user,reload, post}) {
    
    const [input, setInput] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [isComment, setComment] = useState(false)
    const [comment, setMessage] = useState('')
    const [like, setLike] = useState(false)

    const toggleComment = async (e) => {
        try {
            setIsEdit(false)
            e.preventDefault()
            setComment(!isComment)
            setMessage('')
            
        } catch (error) {
            console.error(error);
        }
    }

    const addComment = async(e) => {
        try {
            if (comment){

                e.preventDefault()
                const body = {
                    post_id : post.id,
                    description : comment
                }
    
                await axios.post('/comment', body)
                setMessage('')
            }
            
            setComment(false)
            reload()
            
        } catch (error) {
            console.error(error)
        }
    }

    const deletePost = async() => {
        try {
            const check = window.confirm("Are you sure ???")
            if (check) {
                await axios.delete(`/post/${post.id}`)
            }
            reload()
        } catch (error) {
            console.error(error);
        }
    }
    
    const editPost = async (e) => {
        try{
            setComment(false)
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
            // console.log('edit');

        } catch(error){
            console.error(error);
        }
    }
    const toggleEdit = (e) => {
        try {
            e.preventDefault()
            setComment(false)
            setInput(message)
            setIsEdit(true)
        } catch (error) {
            console.error(error);
        }
    }



    let content = (
        <div className='post'>
            <div className='post_top'>
                <div className='post-info'>
                    <Avatar src={profile} className='avatar'/>
                    <div className='post_topInfo'>
                        <h3>{username}</h3>
                        <p>{timeSince(timestamp)}</p>
                    </div>
                </div>
                <div className='button'>
                    { (user.id === post.UserId) ?
                        <>
                        <button onClick={(e)=> toggleEdit(e)}><EditIcon style={{color : 'blue'}} /></button>
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
                <div className='post_option' onClick={()=>setLike(prev=>!prev)} >
                    {(!like) && (
                        <>
                            <ThumbUpIcon/>
                            <p>Like</p>
                        </>
                    )}
                    {(like) && (
                        <>
                            <ThumbUpIcon style={{color:'blue'}}/>
                            <p style={{color:'blue'}}><strong>Like</strong></p>
                        </>
                    )}
                </div>
                <div className='post_option' onClick={(e) => toggleComment(e)}>
                    <ChatBubbleIcon/>
                    <p>Comment</p>
                </div>
                <div className='post_option'>
                    <SendIcon/>
                    <p>Share</p>
                </div>
        </div>
        
        {(isComment)? 
            <div className='comment-form'>
                <Avatar src={user.image} />
                <form>
                    <input 
                        type='text'
                        className='comment-input'
                        placeholder={`Write something ...`}
                        value={comment}
                        onChange={e => setMessage(e.target.value)}
                    />
                <button type='submit' className='comment-submit' onClick={e => addComment(e)} >Send</button>
                </form>
            </div>
            : <></> }
        

        {post.Comments && post.Comments.map(comment => (
            <Comment  
                key={comment.id} 
                description = {comment.description}
                firstname={comment.User.firstname} 
                lastname = {comment.User.lastname} 
                image = {comment.User.image}
                createdAt = {comment.createdAt}
                comment = {comment}
                user = {user}
                post = {post}
                reload = {reload}
                isComment = {isComment}
                setComment = {setComment}
                setMessage = {setInput}
                />
        ))}
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
                    <p>{timeSince(timestamp)}</p>
                </div>
            </div>

        </div>
        <div className='post_bottom'>
            <form>
                <input 
                    type='text'
                    className='message-input'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type='submit' onClick={(e) => editPost(e)} >Send</button>
            </form>
            </div>
        <div className='post_image'>
              {image && <img src={image} alt="post" />}
        </div>
        <div className='post_options'>
                <div className='post_option' onClick={()=>setLike(prev=>!prev)} >
                            {(!like) && (
                                <>
                                    <ThumbUpIcon/>
                                    <p>Like</p>
                                </>
                            )}
                            {(like) && (
                                <>
                                    <ThumbUpIcon style={{color:'blue'}}/>
                                    <p style={{color:'blue'}}><strong>Like</strong></p>
                                </>
                            )}
                </div>

                <div className='post_option' onClick={(e) => toggleComment(e)}>
                    <ChatBubbleIcon/>
                    <p>Comment</p>
                </div>
                <div className='post_option'>
                    <SendIcon/>
                    <p>Share</p>
                </div>
        </div>
        
            
        {post.Comments && post.Comments.map(comment => (
            <Comment  
                key={comment.id} 
                description = {comment.description}
                firstname={comment.User.firstname} 
                lastname = {comment.User.lastname} 
                image = {comment.User.image}
                createdAt = {comment.createdAt}
                comment = {comment}
                user = {user}
                post = {post}
                reload = {reload}
                />
        ))}


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