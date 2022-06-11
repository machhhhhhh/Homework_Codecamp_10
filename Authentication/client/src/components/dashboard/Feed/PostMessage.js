import React , {useState}from 'react'
import '../../css/dashboard/message.css'
import {Avatar} from '@mui/material'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoIcon from '@mui/icons-material/Photo';
import MoodIcon from '@mui/icons-material/Mood';
import axios from '../../../config/axios'

function PostMessage(props) {

    const [input, setInput] = useState('')
    // const [image, setImage] = useState('')

    const handleSubmit = async(e) => {
        // axios.post to backend
        
        try{
            e.preventDefault()
            if(input){
                const body  = {
                    description : input,
                    // user_id : props.user.id
                    // emotion : ,
                    // photo : 
                }
        
                await axios.post('/post', body)
            }
            setInput('')
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