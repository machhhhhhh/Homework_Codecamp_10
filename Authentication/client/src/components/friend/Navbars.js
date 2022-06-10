import React from 'react'
import Navbar from './Navbar'
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FlagIcon from '@mui/icons-material/Flag';
import GroupsIcon from '@mui/icons-material/Groups';
import CakeIcon from '@mui/icons-material/Cake';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../css/friend/navbar.css'

function Navbars() {
  return (
    <div className='navbars'>

        <div className='navbars-header'>
            <h1>Friends</h1>
            <div className='navbars-header-setting'>
              <SettingsIcon/>
            </div>
        </div>
        
        <div className='main'>
          <Navbar
            title = 'Main'
            Icon = {GroupIcon}
          />
        </div>
        <Navbar
          title = 'Request'
          Icon = {PersonAddIcon}
          Arrow = {ArrowForwardIosIcon}
        />
        <Navbar
          title = 'Suggest'
          Icon = {FlagIcon}
          Arrow = {ArrowForwardIosIcon}
        />
        <Navbar
          title = 'All Friends'
          Icon = {GroupsIcon}
          Arrow = {ArrowForwardIosIcon}
        />
        <Navbar
          title = 'Birthday'
          Icon = {CakeIcon}
        />
        <Navbar
          title = 'Customize'
          Icon = {CheckBoxIcon}
          Arrow = {ArrowForwardIosIcon}
        />
    </div>
  )
}

export default Navbars