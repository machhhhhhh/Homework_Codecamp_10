import { Avatar } from 'antd'
import React , {useEffect, useState}from 'react'
import '../../css/dashboard/comment.css'
import axios from '../../../config/axios'
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

function Comment({description, firstname, lastname, image, createdAt,comment, user, post, reload, isComment, setComment,setMessage}) {

    const [isEdit, setEdit] = useState(false)
    const [text, setText] = useState('')

    useEffect(()=>{
        if(isComment) {
            setEdit(false)
        }



    },[isComment])


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
            setComment(false)
            setText(description)
            setEdit(true)
            reload()
        } catch (error) {
            console.error(error);
        }
    }

    let content = (
        <div className='comment'>
            {/* {props.comment.id} */}
            <div className='comment-top'>
                    <Avatar src={image} className='comment-avatar'/>
                    <div className='comment-info'>
                        <h3>{firstname}  {lastname}</h3>
                        <h4>{description}</h4>
                        {/* <p>{createdAt}</p> */}
                    </div>
            </div>
            <div className='comment-button'>
                {(user.id === comment.UserId)  ? 
                <>
                    {(isComment)?
                        <></> :
                        (isEdit)? <></> :
                        <> 
                            <IconButton className='icon-button'>
                                <EditIcon onClick={()=>toggleEdit()} className='button-edit'/>
                            </IconButton>
                            <IconButton>
                                <ClearIcon onClick={()=>deleteComment()} className="button-delete" />
                            </IconButton>
                        </>
                    }
                </>
                :
                    (user.id === post.UserId) ?
                        <>
                            {(isComment)?
                            <></> :
                            <>
                                <IconButton>
                                    <ClearIcon onClick={()=>deleteComment()} className='button-delete'/>
                                </IconButton>
                            </>
                    }
                        </>
                    :   <></>
                }
            </div>
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
                                <button type='submit' onClick={e => editComment(e)} >send</button>
                            </form>
                            {/* <p>{createdAt}</p> */}
                        </div>
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