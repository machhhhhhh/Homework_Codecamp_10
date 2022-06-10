import React from 'react'
import '../../css/dashboard/contact.css'
import Friend from './Friend'

import MenuIcon from '@mui/icons-material/Menu';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

function Friends() {
  return (
    <div className='contact'> 
        <div className='contact-header'>
            <h2>Contact</h2>
            <div className='contact-header-icon'>
              <div className='icon'>
                <IconButton>
                   <VideoCallIcon/>
                </IconButton>
              </div>
              <div className='icon'>
              <IconButton>
                <SearchIcon/>
              </IconButton>
              </div>
              <div className='icon'>
                <IconButton>
                <MenuIcon/>
                </IconButton>
              </div>
            </div>
        </div>

        <Friend 
          profile="" 
          name = "March"
          />
        <Friend 
          profile="" 
          name = "Blue"
          />
        <Friend 
          profile="" 
          name = "Mol"
          />

    </div>
  )
}

export default Friends