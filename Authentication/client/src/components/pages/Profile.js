import React from 'react'
import Header from '../dashboard/Header'
import Profiles from '../profile/Profile'

function Profile(props) {


  return (
    <div className='profile'>
            <Header setRole = {props.setRole} user = {props.user} />
            <Profiles user = {props.user} />
    </div>
  )
}

export default Profile