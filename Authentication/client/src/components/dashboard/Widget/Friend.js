import React from 'react'
import {Avatar} from '@mui/material'

function Friend({profile, name}) {
  return (
    <div className='friend-contact'>
        <div className='friend-profile'>
            <Avatar src={profile} />
        </div>
        <div className='friend-name'>
            <h3>{name}</h3>
        </div>
    </div>
  )
}

export default Friend