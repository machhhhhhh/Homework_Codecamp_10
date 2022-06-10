import React from 'react'
import Ad from './Ad'
import '../../css/ads.css'

function Ads() {
  return (
    <div className='ads'>
        <h2>Supported</h2>
        
        <Ad 
            image="https://www.startupnow.in.th/wp-content/uploads/2020/12/web-copy-3.png" 
            title="Click link here"  
            link="www.google.com"
            />
        <Ad 
            image="https://i.insider.com/5150710969beddc11500000b?width=750&format=jpeg&auto=webp" 
            title="4 number for change life" 
            link="www.google.com"
            />
    </div>
  )
}

export default Ads