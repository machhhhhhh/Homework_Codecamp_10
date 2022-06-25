import React from 'react'
import {useNavigate} from 'react-router-dom'

function Map() {

    const navigate = useNavigate()

    const back = async(e) => {
        try {
            e.preventDefault()
            return navigate('/index')
            
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className='map'>
        <h1>MAP ROAD</h1>
        <button onClick={(e)=>back(e)}>BACK</button>
    </div>
  )
}

export default Map