import React from 'react'
import Navbar from './Navbar'
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FlagIcon from '@mui/icons-material/Flag';
import CakeIcon from '@mui/icons-material/Cake';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../css/friend/navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import {ALL_FRIEND, REQUEST_FRIEND, FIND_FRIEND} from '../../config/data'

function Navbars({changeMode}) {
  return (
    <div className='navbars'>

        <div className='navbars-header'>
            <h1>Friends</h1>
            <div className='navbars-header-setting'>
              <SettingsIcon/>
            </div>
        </div>
        
        <div className='main' onClick={()=>changeMode(ALL_FRIEND)} >
          <Navbar
            title = 'All Friends'
            Icon = {GroupIcon}
          />
        </div>
       <div onClick={()=>changeMode(REQUEST_FRIEND)}>
          <Navbar
              title = 'Request'
              Icon = {PersonAddIcon}
              Arrow = {ArrowForwardIosIcon}
            />
       </div>
        <div onClick={()=>changeMode(FIND_FRIEND)}>
          <Navbar
            title = 'Search'
            Icon = {SearchIcon}
            Arrow = {ArrowForwardIosIcon}
          />
        </div>
        <Navbar
          title = 'Suggest'
          Icon = {FlagIcon}
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