import React, { useState } from 'react';
import './App.css';
import PrivateRoutes from './components/private-routes/PrivateRoutes';
import LocalStorageservice from './services/localStorageservice';

function App() {

  const [role, setRole] = useState(LocalStorageservice.getRole())

  return (
      <PrivateRoutes role= {role} setRole= {setRole}/>
  );
}

export default App;
