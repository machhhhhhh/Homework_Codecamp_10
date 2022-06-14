import React, { useState} from 'react';
import './App.css';
import PrivateRoutes from './components/private-routes/PrivateRoutes';
import LocalStorageservice from './services/localStorageservice';
import {BrowserRouter} from 'react-router-dom'

function App() {

  const [role, setRole] = useState(LocalStorageservice.getRole())

  return (
    <BrowserRouter>
      <PrivateRoutes  role= {role} setRole= {setRole}/>
    </BrowserRouter>
  );
}

export default App;
