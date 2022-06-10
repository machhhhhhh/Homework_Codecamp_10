import React from 'react'
import '../../css/friend.css'
import AddFriend from './AddFriend'

function Add() {
  return (
    <div className='add-friend' >
      <div className='add-friend-header'>
        <h2>Requested</h2>
        <p>See all</p>
      </div>

      <AddFriend name="March" friend="5" when="20" />
      <AddFriend name="Blue" friend="20" when="10" />

    </div>
  )
}

export default Add