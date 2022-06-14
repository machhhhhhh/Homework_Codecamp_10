import React, { useEffect, useState } from 'react'
import { Switch ,Redirect, Route} from 'react-router-dom'
import ConfigRoutes from '../../config/routes'
import jwtDecode from 'jwt-decode'
import LocalStorageservice from '../../services/localStorageservice';
import axios from '../../config/axios';

function PrivateRoutes(props) {

    const role = props.role || 'guest'

    const allowRoutes = ConfigRoutes[role].allowRoutes
    const redirectRoutes = ConfigRoutes[role].redirectRoutes

    const [user, setUser] = useState([])

    useEffect(()=>{

        const fetchUser = async () => {
            try {
                const token = LocalStorageservice.getToken()
                const result = await axios.get('/user')
                const data = result.data
                const profile = data.filter(user => user.id === jwtDecode(token).id)
                profile.map(user => {
                     return setUser(user)
                })
            } catch (error) {
                console.error(error)
            }
          }
    
        if(role !== 'guest') fetchUser()
    },[role])  


  return (
    // // Routes
    <Switch> 
        {allowRoutes.map(route => 
        <Route 
                path={route.url}
                key={route.url}
                exact
        >
            <route.component setRole={props.setRole} user = {user} />
        </Route>
        )}
        <Redirect to={redirectRoutes}/>
    </Switch>
  )
}

export default PrivateRoutes