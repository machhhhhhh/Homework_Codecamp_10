import { Switch ,Redirect, Route} from 'react-router-dom'
import React from 'react'
import ConfigRoutes from '../../config/routes'

function PrivateRoutes(props) {

    const role = props.role || 'guest'

    const allowRoutes = ConfigRoutes[role].allowRoutes
    const redirectRoutes = ConfigRoutes[role].redirectRoutes


  return (
    <Switch>
        {allowRoutes.map(route => 
        <Route 
                path={route.url}
                key={route.url}
                exact
        >
            <route.component setRole={props.setRole}/>
        </Route>
        )}
        <Redirect to={redirectRoutes}/>
    </Switch>
  )
}

export default PrivateRoutes