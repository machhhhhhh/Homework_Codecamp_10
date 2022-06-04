import React from 'react'

function SidebarRow({title, Icon}) {
  return (
    <div className='sidebar-row'>
        {<Icon fontSize='large' />}
        <h4>{title}</h4>
    </div>
  )
}

export default SidebarRow