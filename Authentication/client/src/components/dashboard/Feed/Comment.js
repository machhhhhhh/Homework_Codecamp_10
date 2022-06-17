import { Avatar } from 'antd'
import React , {useEffect, useState}from 'react'
import '../../css/dashboard/comment.css'
import axios from '../../../config/axios'
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import timeSince from '../../../config/timeSince'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';

function Comment({description, firstname, lastname, image, createdAt,comment, user, post, reload, isComment, setComment,setMessage, isPostEdit}) {

    const [isEdit, setEdit] = useState(false)
    const [text, setText] = useState('')
    const [like, setLike] = useState(false)

    useEffect(()=> {


        const fetchLike = async () => {
            try{
                const result = await axios.get(`/comment-like/${comment.id}`)
                // console.log(result)
                setLike(result.data);                
            } catch(err) {
                console.error(err)
            }
        }

        fetchLike()

    },[like])

    const pressLike = async() => {

        try{
            
            const body = {
                comment_id : comment.id
            }
            await axios.post('/comment-like',body)
            setLike(prev=>!prev)
            reload()
        } catch(err) {
            console.error(err)
        }

    }

    const pressUnlike = async() => {

        try{

            await axios.delete(`/comment-like/${comment.id}`)
            setLike(prev=>!prev)
            reload()
        } catch(err) {
            console.error(err)
        }

    }



    const deleteComment = async (e) => {
        try{
            // e.preventDefault()
            const check = window.confirm("Are you sure ???")
            // console.log(post);
            // const body = {
            //     post_id : post.id
            // }
            if(check){
                await axios.delete(`/comment/${comment.id}`, {
                    data : {
                        post_id : post.id
                    }
                })
            }
            
            reload()

        } catch(err){
            console.error(err)
        }

    }

    const editComment = async(e) => {
        try{
            if(text){
                e.preventDefault()

                const body = {
                    description : text
                }

                await axios.put(`/comment/${comment.id}`, body)

                reload()
            }
            setText('')
            setEdit(false)

        }catch(err) {
            console.error(err)
        }
    }

    const toggleEdit = () => {
        try {
            setMessage('')
            setText(description)
            setEdit(true)
            // reload()
        } catch (error) {
            console.error(error);
        }
    }

    let content = (
        <div className='comment'>
            {/* {props.comment.id} */}
            <div className='comment-top'>
                    <Link to={{
                        pathname : '/user',
                        state : {
                            user_id : comment.UserId
                        }
                    }}>
                        <Avatar src={image} className='comment-avatar'/>
                    </Link>
                    <div className='comment-info'>
                        <h3>{firstname}  {lastname}</h3>
                        <h4>{description}</h4>
                        {/* <p>{createdAt}</p> */}
                    </div>
                    <p>{timeSince(createdAt)}</p>
            </div>

                {!isPostEdit && (
                    <>
                        {like && (
                            <div className='comment-like' onClick={()=>pressUnlike()}>
                                <ThumbUpIcon style={{color:'blue'}}/>
                            </div>
                            )}
                        {!like && (
                            <div className='comment-like' onClick={()=>pressLike()}>
                                <ThumbUpIcon />
                            </div>
                        )}

                        {comment.CommentLikes.length!== 0 && <p className='comment-length'>{comment.CommentLikes.length}</p>}
                    </>
                )}
                

            {/* {isPostEdit===false &&  ( */}
                <div className='comment-button'>
                {(user.id === comment.UserId)  ? 
                <>
                    {isPostEdit ===false && (
                        <>
                                <EditIcon onClick={()=>toggleEdit()} className='button-edit'/>
                                <ClearIcon onClick={()=>deleteComment()} className="button-delete" />
                        </>
                    )}
                            
                </>
                :
                    (user.id === post.UserId) ?
                        <>
                                {isPostEdit===false && (
                                        <ClearIcon onClick={()=>deleteComment()} className='button-delete'/>
                                )}
                            </> : <></>
                }
            </div>
            {/* )} */}
        </div>
    )

    if (isEdit) {
            content = (
                <div className='comment'>
                {/* {props.comment.id} */}
                <div className='comment-top'>
                        <Avatar src={image} className='comment-avatar'/>
                        <div className='comment-info'>
                            <h3>{firstname}  {lastname}</h3>
                            <form>
                                <input 
                                    type='text'
                                    value= {text}
                                    onChange= {e => setText(e.target.value)}
                                />
                                <button type='submit' className='comment-edit' onClick={e => editComment(e)} ><SendIcon/></button>
                            </form>
                            {/* <p>{createdAt}</p> */}
                        </div>
                            {/* {!like && (
                                <div className='comment-like-edit' onClick={()=>pressLike()}>
                                    <ThumbUpIcon/>
                                </div>
                            )}
                            {like && (
                                <div className='comment-like-edit' onClick={()=>pressUnlike()}>
                                    <ThumbUpIcon style={{color:'blue'}}/>
                                </div>
                            )} */}
                        {/* <p>{timeSince(createdAt)}</p> */}
                </div>
                {/* <div className='comment-button'>
                    {(user.id === comment.UserId) ?  
                    <>
                        <button>edit</button>
                        <button>del</button>
                    </>
                    :
                        (user.id === post.UserId) ?
                            <button>delete</button>
                        :
                        <>
                            <h2>You Can't edit del</h2>
                        </>
                    }
                </div> */}
            </div>

        )
    }

  return (
    <>
        {content}
    </>
  )
}

export default Comment