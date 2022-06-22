import React from 'react'

function home({logout}) {
  return (
    <div>
      <button onClick={()=>logout()}>Out</button>
    </div>
  )
}

export default home