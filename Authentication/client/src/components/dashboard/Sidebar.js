import React from 'react'
import '../css/dashboard/sidebar.css'
import SidebarRow from './Sidebar/SidebarRow'

import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import StorefrontIcon from '@mui/icons-material/Storefront';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import {Link, useHistory} from 'react-router-dom'

function Sidebar(props) {

  const history = useHistory()

  const friend =  () => {
      try {
       return history.push('/friend')
      }
      catch(err) {
        console.error(err)
      }
  }

  return (
    <div className='sidebar'>
        <Link to={{
            pathname : '/user',
            state : {
              user_id : props.user.id
            }
        }}>
              <SidebarRow title={props.user.firstname + ' ' + props.user.lastname}  user={props.user}/>
        </Link>
        <span onClick={()=>friend()}>
          <SidebarRow title="Friends" Icon={GroupIcon} />
        </span>
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