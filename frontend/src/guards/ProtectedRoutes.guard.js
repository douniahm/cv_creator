import React from 'react';
import {userService} from '../services/user.service';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoutes = ({component: Component, ...rest}) => (
    <Route {...rest}
        render={props => (
            userService.isUserLogged()!=null
                ? <Component {...props} />
                : <Redirect to='/login' />
        )}
    />
)
export default ProtectedRoutes;