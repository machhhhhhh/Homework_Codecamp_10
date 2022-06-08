import React from 'react'
import '../css/sidebar.css'
import SidebarRow from './Sidebar/SidebarRow'

import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import StorefrontIcon from '@mui/icons-material/Storefront';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';

import Friend from '../pages/Friend';

function Sidebar(props) {

    

  return (
    <div className='sidebar'>
        {/* <Link to="/friend" component={Friend} > */}
        <SidebarRow title={props.user.firstname + ' ' + props.user.lastname}  user={props.user}/>
        {/* </Link> */}
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