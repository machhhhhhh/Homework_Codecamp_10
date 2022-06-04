import React from 'react'
import StoryReel from './StoryReel'
import '../css/header.css'

function StoryHeader() {
  return (
    <div className='story_header'>
      <div className='header'>
        <div className='header_option header_option--active'>
            <h1>Stories</h1>
        </div>
        <div className='header_option'>
            <h1>Reels</h1>
        </div>
      </div>
        <StoryReel/>
    </div>
  )
}

export default StoryHeader