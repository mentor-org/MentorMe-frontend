/* eslint-disable max-len */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Auth from '../pages/Auth';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/auth/signup" render={props => <Auth {...props} type="signup" />} />
            <Route exact path="/auth/login" render={props => <Auth {...props} type="login" />} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
