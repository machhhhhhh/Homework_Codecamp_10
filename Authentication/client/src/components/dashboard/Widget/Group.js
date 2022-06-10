import React from 'react'

import {Avatar} from '@mui/material'

function Group({name, image}) {
  return (
    <div className='group'>
        <Avatar  src={image} />
        <h4>{name}</h4>
    </div>
  )
}

export default Group