/* eslint-disable max-len */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Authenticator from '../../containers/hoc/Authenticator';
import Question from '../pages/Question';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';
import Users from '../pages/People';
import UserProfile from '../pages/UserProfile';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/question/:id" component={Authenticator(Question)} />
            <Route exact path="/profile" component={Authenticator(Profile)} />
            <Route exact path="/people" component={Authenticator(Users)} />
            <Route exact path="/user/:id" component={Authenticator(UserProfile)} />
            <Route exact path="/auth/signup" render={props => <Auth {...props} type="signup" />} />
            <Route exact path="/auth/login" render={props => <Auth {...props} type="login" />} />
            <Route path="/*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
