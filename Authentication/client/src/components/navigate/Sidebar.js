import React from 'react'
import '../css/sidebar.css'
import SidebarRow from './SidebarRow'

import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import StorefrontIcon from '@mui/icons-material/Storefront';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import {Avatar} from '@mui/material'
function Sidebar(props) {

    

  return (
    <div className='sidebar'>
        <SidebarRow title={props.user.id} Icon={Avatar} />
        <SidebarRow title="Friends" Icon={GroupIcon} />
        <SidebarRow title="Groups" Icon={GroupsIcon} />
        <SidebarRow title="Marketplace" Icon={StorefrontIcon} />
        <SidebarRow title="Watch" Icon={YouTubeIcon} />
        <SidebarRow title="Memmories" Icon={AccessTimeIcon} />
        <SidebarRow title="Messager" Icon={SendIcon}/>
        <SidebarRow title="More" Icon={ExpandMoreIcon}/>
    </div>
  )
}

export default Sidebar