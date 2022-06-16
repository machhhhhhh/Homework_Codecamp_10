import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';

const url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'

function User({user, check}) {
  return (
    <div className='user'>
        <img src={user.image ? user.image : url} alt='user' />
        <div className='user-check'>
            <h1>{user.firstname ? user.firstname : 'No User'} <span> {user.lastname && user.lastname}</span> </h1>
            {check ==="ACCEPT" && (
                <button className='button-check-unfriend'>
                  <strong>Unfriend</strong>
                </button>
            )}

            {check ==="PENDING" && (
                <button className='button-check-unfriend'>
                  <strong>Cancel</strong>
                </button>
            )}
            {check ==="REQUEST" && (
              <div className='user-request'>
                <button className='button-request-accept'>
                   <strong> <CheckIcon/></strong>
                </button>
                <button className='button-request-remove'>
                  <strong><RemoveIcon/></strong>
                </button>
              </div>
            )}
            {check ==="SEND" && (
                <button className='button-send'>
                  <strong><AddIcon/></strong>
                </button>
            )}
            

        </div>

    </div>
  )
}

export default User