import React from 'react'

function home({logout,user}) {


  return (
    <div>
      <h1>{user.firstname} {user.lastname}</h1>
      <button onClick={()=>logout()}>Out</button>
    </div>
  )
}

export default home