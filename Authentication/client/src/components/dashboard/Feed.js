import React, { useEffect ,useState } from 'react'
import '../css/feed.css'

import PostMessage from './Feed/PostMessage'
import StoryHeader from './Feed/StoryHeader'
import Post from './Feed/Post'
import axios from '../../config/axios'


function Feed(props) {

  const [posts, setPost] = useState([])

  async function loadPost () {
    try {
        const result = await axios.get('/post')
  
        result.data.map(post=>{
          console.log(post);
        })
  
      // posts = result.data
  
      setPost(result.data)
      // setUser(result.data.user)



    } catch (error) {
        console.error(error);
    }
  }
  

  useEffect(()=>{

    

    loadPost()
  },[])


  return (

    <div className='feed'>
      <StoryHeader/>
      <PostMessage user={props.user} reload = {loadPost} />


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
                reload = {loadPost}
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