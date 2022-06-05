import React from 'react'
import '../css/widget.css'
import Ads from './Widget/Ads'
import Friends from './Widget/Friends'
import Add from './Widget/Add'
import Groups from './Widget/Groups'
import ScrollArea from 'react-scrollbar'

function Widgets() {
  return (
    <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
            >
              <div className='widgets'>
              
                <Ads/>
                <Add/>
                <Friends/>
                <Groups/>
              </div>

    </ScrollArea>
  )
}

export default Widgets