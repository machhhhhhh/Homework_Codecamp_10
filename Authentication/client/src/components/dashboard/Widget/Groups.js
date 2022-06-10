import React from 'react'
import '../../css/dashboard/group.css'
import Group from './Group'

function Groups() {
  return (
    
    <div className='groups'>
        <h2>Group Chat</h2>
        <Group 
            name="Group 1" 
            image=""
            />
        <Group 
            name="Group 2" 
            image=""
            />
        <Group 
          name="Group 3" 
          image=""
          />
        <Group 
          name="Create New Group" 
          image="https://www.kindpng.com/picc/m/207-2073445_add-button-icon-png-plus-icon-white-png.png"
          />
    </div>
  )
}

export default Groups