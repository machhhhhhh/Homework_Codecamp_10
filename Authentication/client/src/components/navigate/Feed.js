import React from 'react'
import '../css/feed.css'

import PostMessage from './Feed/PostMessage'
import StoryHeader from './Feed/StoryHeader'
import Post from './Feed/Post'

function Feed(props) {
  return (
    <div className='feed'>
      <StoryHeader/>
      <PostMessage user={props.user} />

      <Post
        profile="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
        image="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg"
        username="mach"
        timestamp="this is a time"
        message="message"
      />
      
    </div>
  )
}

export default Feed