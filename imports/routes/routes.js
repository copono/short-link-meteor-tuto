import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import browserHistory from '../api/history';
import {PrivateRoute, PublicRoute} from '../api/customRoutes';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFount from '../ui/NotFound';

//window.browserHistory = browserHistory

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
  
    if (isAuthenticated && isUnauthenticatedPage) { 
      browserHistory.replace('/link')
    } else if (!isAuthenticated && isAuthenticatedPage) {
      browserHistory.replace('/')
    }
}

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <PublicRoute path="/" exact component={Login}/>
      <PublicRoute path="/signup" component={Signup}/>
      <PrivateRoute path="/link" component={Link}/>
      <Route path="*" component={NotFount}/>
    </Switch>
  </Router>
);