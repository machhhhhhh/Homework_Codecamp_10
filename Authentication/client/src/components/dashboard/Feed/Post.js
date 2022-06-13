import React, { useEffect, useRef, useState } from 'react'
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
import CancelIcon from '@mui/icons-material/Cancel';

function Post({profile, image, username, timestamp, message, user,reload, post}) {
    
    const [photo,setPhoto] = useState(null)
    const [input, setInput] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [isComment, setComment] = useState(false)
    const [comment, setMessage] = useState('')
    const [like, setLike] = useState(false)

    const inputEl = useRef()

    useEffect(()=>{
        
        const fetchLike = async(id) => {
            try{
                const result = await axios.get(`/like/${id}`)
                setLike(result.data);
            } catch(err){
                console.error(err)
            }
        }


        fetchLike(post.id)

    },[like])



    const pressLike = async() => {
        try{

            const body = {
                post_id : post.id
            }
            await axios.post('/like', body)
            setLike(prev=>!prev)
        } catch(err){
            console.error(err)
        }
    }
    const pressUnlike = async() => {
        try{    
            await axios.delete(`/like/${post.id}`)
            setLike(prev=>!prev)
        } catch(err){
            console.error(err)
        }
    }

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
            // const body = {
            //     description: input 
            //     // photo : ,
            //     // emotion : 
            // }
            const formData = new FormData()
            if(photo) {
                formData.append('postImg', photo)
            }
            formData.append('description', input)

            await axios.put(`/post/${post.id}`, formData)
            setInput("")
            setIsEdit(false)
            reload()
            setComment(prev=>!prev)
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
                            <button className='button-button-edit' onClick={(e)=> toggleEdit(e)}><EditIcon /></button>
                            <button className='button-button-del' onClick={(e)=>deletePost(e)}><DeleteIcon/></button>
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
                    {(!like) && (
                        <div className='post_option' onClick={()=>pressLike()} >
                            <ThumbUpIcon/>
                            <p>Like</p>
                        </div>
                    )}
                    {(like) && (
                        <div className='post_option' onClick={()=>pressUnlike()} >
                            <ThumbUpIcon style={{color:'blue'}}/>
                            <p style={{color:'blue'}}><strong>Like</strong></p>
                        </div>
                    )}
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
            <>
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
                            isPostEdit = {isEdit}
                            />
                    ))}
                    
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
                    <button type='submit' className='comment-submit' onClick={e => addComment(e)} ><SendIcon/></button>
                    </form>
                </div>
            </>
            : <></> }
        

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
                <button className='button-cancle-edit' onClick={()=>setIsEdit(prev=>!prev)} ><CancelIcon/></button>
        </div>
        <div className='post_bottom'>
            <form className='post-buttom-edit'>
                <input 
                    type='text'
                    className='message-input'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type='submit' className='button-post-edit' onClick={(e) => editPost(e)} ><SendIcon/></button>
            </form>
        </div>
        <div className='post_image'>

                <input 
                    type='file'
                    hidden
                    onChange={(e)=>setPhoto(e.target.files[0])}
                    ref={inputEl}
                />
                <img 
                    src={photo ? URL.createObjectURL(photo) : image}  
                    onClick={()=>inputEl.current.click()}
                    alt='post'
                />

        </div>
        <div className='post_options'>
                            {(!like) && (
                                <div className='post_option' onClick={()=>pressLike()} >
                                    <ThumbUpIcon/>
                                    <p>Like</p>
                                </div>
                            )}
                            {(like) && (
                                <div className='post_option' onClick={()=>pressUnlike()} >
                                    <ThumbUpIcon style={{color:'blue'}}/>
                                    <p style={{color:'blue'}}><strong>Like</strong></p>
                                </div>
                            )}

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
                            isComment = {!isComment}
                            setComment = {setComment}
                            setMessage = {setInput}
                            isPostEdit={isEdit}
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