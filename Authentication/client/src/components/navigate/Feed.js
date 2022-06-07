import React, { useEffect ,useState } from 'react'
import '../css/feed.css'

import PostMessage from './Feed/PostMessage'
import StoryHeader from './Feed/StoryHeader'
import Post from './Feed/Post'
import axios from '../../config/axios'


function Feed(props) {

  const [posts, setPost] = useState([])

  const loadPost = async() => {
    const result = await axios.get('/post')

    // console.log(result.data)
    // posts = result.data

    setPost(result.data)
    // console.log(post);
    // posts.map(post => {
    //   console.log(post);
    // })
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
            profile={props.user.image}
            image={post.photo}
            username={props.user.firstname + ' ' + props.user.lastname}
            timestamp={post.createAt}
            message={post.description}
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