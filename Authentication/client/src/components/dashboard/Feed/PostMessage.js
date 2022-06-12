import React , {useRef, useState}from 'react'
import '../../css/dashboard/message.css'
import {Avatar} from '@mui/material'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoIcon from '@mui/icons-material/Photo';
import MoodIcon from '@mui/icons-material/Mood';
import axios from '../../../config/axios'
import ClearIcon from '@mui/icons-material/Clear';

function PostMessage(props) {

    const [input, setInput] = useState('')
    const [image, setImage] = useState(null)

    const inputEl = useRef()

    const handleSubmit = async(e) => {
        // axios.post to backend
        
        try{
            e.preventDefault()
            const formData = new FormData()
            // if(input && !image){
            //     formData.append('description',input)
            // }
            // else if (!input && image) {
            //     formData.append('postImg',image)
            // }
            // else if (input && image){
            // }
            
            formData.append('postImg',image)
            formData.append('description',input)
            // else {
            //     alert('No Content')
            //     return window.location.reload()
            // }

            await axios.post('/post', formData)
            setInput('')
            setImage(null)
            inputEl.current.value = null
            window.location.reload()
        } catch(err) {
            console.error(err)
        }
        
    }

  return (
    <div className='message'>

        <div className='message_top'>
            <Avatar src={props.user.image} className="message-avatar"/>
            <form>
                <input 
                    type='text'
                    className='message_input'
                    placeholder={`What's on your mind.`}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                
                
                <button type='submit' onClick={e => handleSubmit(e)} >Send</button>
            </form>
        </div>
        
        <div className='message-photo'>
            {image && (
                <>
                    <img src={URL.createObjectURL(image)} alt='post' />
                    <ClearIcon className='clear-photo' onClick={()=>setImage(null)}/>
                </>
            )}
        </div>

        <div className='message_bottom'>
            <div className='message_option'>
                <VideoCameraFrontIcon style={{color : 'red'}} fontSize='large'/>
                <h3>Live Video</h3>
            </div>
            <div className='message_option' onClick={()=>inputEl.current.click()}>
                <input type='file' 
                        onChange={e => setImage(e.target.files[0])} 
                        ref={inputEl}
                        hidden
                        alt='message'
                        />
                <PhotoIcon style={{color : 'green'}}   fontSize='large'/>
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