import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          Meteor.userId() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  export function PublicRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          !Meteor.userId() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/link",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }