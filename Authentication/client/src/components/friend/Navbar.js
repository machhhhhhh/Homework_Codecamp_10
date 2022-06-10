import React from 'react'

function Navbar({title,Icon, Arrow}) {
  return (
    <div className='navbar'>
        <div className='navbar-info'>
            <div className='navbar-div-icon'>
              <Icon className='navbar-icon'/>
            </div>
            <h3>{title}</h3>
        </div>
        <div className='navbar-arrow'>
            {Arrow && <Arrow/>}
        </div>
    </div>
  )
}

export default Navbar