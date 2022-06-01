import React from 'react'
import '../css/header.css'
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  return (
        <div className='header'>
            <div className='header_left'>
                <img
                    src = '//upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/150px-Facebook_f_logo_%282021%29.svg.png'
                />

                <div className='header_input' >
                    <SearchIcon/>
                    <input type='text' />

                </div>

            </div>


            <div className='header_middle'>Middle</div>
            <div className='header_right' >Right</div>
        </div>
    )
}

export default Header