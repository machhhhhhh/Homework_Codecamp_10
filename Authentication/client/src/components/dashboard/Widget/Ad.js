import React from 'react'

function Ad({image, title, link}) {
  return (
    <div className='ad'>
        <img src={image} className="ad_image" alt='ads' />
        <div className='ad_title'>
            <h3>{title}</h3>
            <p>{link}</p>
        </div>

    </div>
  )
}

export default Ad