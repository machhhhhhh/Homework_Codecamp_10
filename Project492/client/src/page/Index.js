import React from 'react'

function Index({logout}) {

  return (
    <div>
        <button onClick={()=>logout()}>Out</button>
    </div>
  )
}

export default Index