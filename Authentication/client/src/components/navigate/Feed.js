import React, { useEffect ,useState } from 'react'
import '../css/feed.css'

import PostMessage from './Feed/PostMessage'
import StoryHeader from './Feed/StoryHeader'
import Post from './Feed/Post'
import axios from '../../config/axios'


function Feed(props) {

  const [posts, setPost] = useState([])
  const [user ,setUser] = useState([])

  const loadPost = async() => {
    const result = await axios.get('/post')

    // console.log(result.data.post)
    // posts = result.data

    setPost(result.data.post)
    setUser(result.data.user)
    // posts.map(post => {
    //   console.log(post);
    // })
    // console.log(result.data.user)
  }

  useEffect(()=>{
    loadPost()
  },[])


  return (

    <div className='feed'>
      <StoryHeader/>
      <PostMessage user={props.user} />

        {posts && posts.map(post => 
          <Post
            key={post.id}
            profile={user.image}
            image={post.photo}
            username={user.firstname + ' ' + user.lastname}
            timestamp={post.createdAt}
            message={post.description}
            user = {props.user}
            post = {post}
            userPost = {user}
            reload = {loadPost}
          />
    )}

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