import React, { useEffect ,useState } from 'react'
import '../css/dashboard/feed.css'

import PostMessage from './Feed/PostMessage'
import StoryHeader from './Feed/StoryHeader'
import Post from './Feed/Post'
import axios from '../../config/axios'


function Feed(props) {

  const [posts, setPost] = useState([])

  const fetchPost = async () => {
      try {
        const result = await axios.get('/post')
        // console.log(result.data)
        setPost(result.data)
      } catch (error) {
        console.error(error)
      }
  }

  useEffect(()=>{

    

    fetchPost()

  },[])
  



  return (

    <div className='feed'>
      <StoryHeader/>
      <PostMessage user={props.user} reload = {fetchPost} />


      {posts && posts.map((post)=>(
            <Post
                key={post.id}
                profile={post.User.image}
                image={post.photo}
                username={post.User.firstname + ' ' + post.User.lastname}
                timestamp={post.createdAt}
                message={post.description}
                user = {props.user}
                post = {post}
                reload = {fetchPost}
              />
      ))}

          
          

      {/* <Post
        profile={props.user.image}
        image="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg"
        username={props.user.firstname + ' ' + props.user.lastname}
        timestamp="this is a time"
        message="message"
      /> */}
      
    </div>
  )
}

export default Feed