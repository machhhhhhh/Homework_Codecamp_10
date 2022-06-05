import React from 'react'
import {Avatar} from '@mui/material'

function AddFriend({image , name, when, friend}) {
  return (
    <div className='friend'>
        <Avatar className="avatar" src={image}/>
        
        <div className='friend-content'>
            <div className='friend-info' >

                <div className='friend-when'>
                    <h4>{name}</h4>
                    <p>{friend} mutuals friends</p>
                </div>
                <p>{when} hours ago </p>
                    
            </div>
            <div className='friend-button' >
                    <h4 className='accept' >Accept</h4>
                    <h4 className='reject' >Reject</h4>
            </div>
        </div>
    </div>
  )
}

export default AddFriend