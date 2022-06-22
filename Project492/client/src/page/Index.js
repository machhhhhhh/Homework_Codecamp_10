import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import LocalStorageService from '../service/LocalStorageService'

function Index({logout,role}) {


  return (
    <div>
      <h1>Customer</h1>
        <button onClick={()=>logout()}>Out</button>
    </div>
  )
}

export default Index