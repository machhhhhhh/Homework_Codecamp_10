import React from 'react'
import '../css/dashboard/widget.css'
import Ads from './Widget/Ads'
import Friends from './Widget/Friends'
import Add from './Widget/Add'
import Groups from './Widget/Groups'

function Widgets() {
  return (
              <div className='widgets'>
              
                <Ads/>
                <Add/>
                <Friends/>
                <Groups/>
              </div>

  )
}

export default Widgets