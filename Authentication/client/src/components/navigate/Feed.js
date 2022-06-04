import React from 'react'
import '../css/feed.css'

import PostMessage from './PostMessage'
import StoryHeader from './StoryHeader'
import Post from './Post'

function Feed() {
  return (
    <div className='feed'>
      <StoryHeader/>
      <PostMessage/>
      <Post />
    </div>
  )
}

export default Feed