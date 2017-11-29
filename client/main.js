import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

import Login from './../imports/ui/Login';
import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';

const unauthenticatedPages = [
  '/', '/signup'
];
const authenticatedPages = [
  '/links'
];
const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    browserHistory.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
const routes = (
  <Router history={browserHistory}>
    <Router path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Router path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Router path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Router path="*" component={NotFound}/>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/links');
  }else if(!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace('/');
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});