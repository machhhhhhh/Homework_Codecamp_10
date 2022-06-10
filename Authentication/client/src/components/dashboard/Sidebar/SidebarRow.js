import React from 'react'
import {Avatar} from '@mui/material'


function SidebarRow({title, Icon,user}) {

 

  return (
    <div className='sidebar-row'>
        {user && <Avatar src={user.image}/>}
        {Icon && <Icon fontSize='large' />}
        <h4>{title}</h4>
    </div>
  )
}

export default SidebarRow