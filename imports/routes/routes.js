import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from './../ui/Login';
import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';

const unauthenticatedPages = [
  '/', '/signup'
];

const authenticatedPages = [
  '/links'
];

/**
 * Check if an user is logged, 
 * and then redirect him to /links page
 */
const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    browserHistory.replace('/links');
  }
};

/**
 * Check if an user is not logged, 
 * and then redirect him to root page
 */
const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

/**
 * Call method according to logged status
 * to choose how to redirect the user
 * @param boolean isAuthenticated 
 */
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/links');
  }else if(!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Router path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Router path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Router path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Router path="*" component={NotFound}/>
  </Router>
);
