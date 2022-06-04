import React from 'react'
import '../css/feed.css'

import PostMessage from './PostMessage'
import StoryHeader from './StoryHeader'


function Feed() {
  return (
    <div className='feed'>
      <StoryHeader/>
      <PostMessage/>
    </div>
  )
}

export default Feed