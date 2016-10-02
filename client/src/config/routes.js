/*!
 * Description:
 *
 * Route configuration for the application.
 * A route configuration is basically a set of instructions that tell a router how to try
 * to match the URL and what code to run when it does.
 *
 * We start with a base component as a root route for the application and
 * all other components is children to the base component.
 *
 * We also use getComponent in order to be able to dynamically load components from the
 * server upon route changes. This is not implemented yet, today we load all components
 * in a bundled js file, built by webpack.
 *
 * The Store side utility library we use contains methods against localStorage where we store
 * an authorization token, manage current user information and session time outs.
 *
 * TODO: Dynamically load components from the server on route changes
 *
 * See https://github.com/reactjs/react-router form more information
 *
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created on 2016-07-06
 */

// Import applications component
import Base from '../components/base';
import Home from '../components/home';
import Dashboard from '../components/dashboard';

import LoginForm from '../components/login';
import ProfileForm from '../components/profile/profile-form';
import PageNotFound from '../components/pagenotfound';

import Trivia from '../components/trivia';

// Import Store api
import Store from '../modules/store';



/**
 * Middleware that routes to /login route if authorization-token does not exist.
 * @param nextState
 * @param replace
 */
function redirectToLogin(nextState, replace) {

  if( !Store.isLoggedIn() ) {
      
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
      
  }
  
}


/**
 * The route configurations
 * @type {{component: (any), childRoutes: *[]}}
 */
const routes = {
  
  /**
   * Base component containing the application bar.
   */
  component: Base,
  childRoutes: [
  
    /**
     * Logout route, redirects to home after removing the authorization token and user information
     */
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Store.logOut();
        replace('/');
      }
    },
  
    /**
     * Login route shall always be public
     */
    { path: '/login',
      component: LoginForm
    },
    
    /**
     * PROTECTED routes that requires authentication
     *
     * The function redirectToLogin checks if an access token exists.
     * If the access token exist, we will be able to route to the
     * protected routes below.
     */
    { onEnter: redirectToLogin,
      childRoutes: [
  
        { path: '/users/:id',
          getComponent: (nextState, cb) => {
            cb(null, ProfileForm)
          }
        },
  
        { path: '/trivia',
          getComponent: (nextState, cb) => {
            cb(null, Trivia)
          }
        }
      ]
    },
  
  
    /**
     * SHARED routes
     * Dynamically decide root route dependent if user is authenticated or not.
     */
    { path: '/',
      getComponent: (nextState, cb) => {

        // Dynamically load the correct component
        if (Store.isLoggedIn()) {
          cb(null, Dashboard)
        }
        else {
          cb(null, Home)
        }
      }
    },
  
    /**
     * Page not found route
     */
    {
      path: '*',
      component: PageNotFound
    }
  ]
};


/**
 * Export the route configuration
 */
export default routes;