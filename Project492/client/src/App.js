import React , {useState} from "react";
import LocalStorageService from "./service/LocalStorageService";
import PrivateRoute from './privateRoute/PrivateRoute'

function App() {

  const [role, setRole] = useState(LocalStorageService.getRole())

  return <PrivateRoute role = {role} setRole = {setRole} />

}

export default App;
