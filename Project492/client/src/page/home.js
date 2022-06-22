import React, { useEffect } from 'react'
import LocalStorageService from '../service/LocalStorageService';

function home({logout}) {


  return (
    <div>
      <h1>Shop</h1>
      <button onClick={()=>logout()}>Out</button>
    </div>
  )
}

export default home