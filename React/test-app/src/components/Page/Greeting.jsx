import React from 'react'
import {useParams} from 'react-router-dom'

function Greeting() {

    const { name } = useParams()

  return (
    <>
        <h1>Greeting {name}</h1>
    </>
  )
}

export default Greeting