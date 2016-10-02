/*!
 * Description: Authentication API.
 *
 * The API consist of;
 * - getCurrentUser = GET /api  (*)
 * - logIn          = POST /auth/login
 * - logOut         = Clear the local store
 * - SignUp         = POST /auth/signup
 *
 * All POST ops must use a form with the Content_Type set to "application/x-www-form-urlencoded; charset=UTF-8"
 * All GET ops must set the Content_Type to "application/json".
 *
 * (*) For all routes that require authorization, the header must also include
 * "Authorization": Bearer<authorization token>.
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created on 2016-07-13
 */

// Import fetch polyfill.
import 'whatwg-fetch';

// Import fetch utils.
import { status, json, isError, isAuthorized } from './fetch-utils';

// Import Store API
import Store from './store';


/**
 * Get current user
 *
 * Call the /api endpoint to get the current user when you only have the authorization token
 * This end point is protected and require the authorization token.
 *
 * If the API is successful,
 * - The REST end point will return user information of the current authenticated user
 *
 * The API can fail due to,
 * - There are no authorization token in the store to be included in the header when calling the end point.
 * - The REST server returns an application error, is dealt by the status helper function.
 *
 * @returns {Promise}
 */
const getCurrentUser = () => {
  
  // Return a promise
  return new Promise( function( resolve, reject ) {
    
    // Set options such as method, headers, body, etc.
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      credentials: "omit"
    };
    
    // TODO: Validation authorization token before we fetch.
    
    // Fetch the service
    fetch( '/api', options )
      .then( status )                   // Check status code
      .then( json )                     // Get the response as json
      .then( function( user ) {
  
        // Store user information in the store
        Store.setCurrentUser( user );
        
        // Resolve Promise and pass user information
        resolve( user );
        
      }).catch( function( error ) {
  
        // Reject promise and pass error information
        reject( error );
      
      });
    
  });
  
};


/**
 * LogIn API
 *
 * Log in against the /auth/login end point.
 *
 * If successful authentication,
 * - the REST server will return an authorization token that we store in the storage.
 * - the authorization token is used to call a service API endpoint (/api) via the getCurrentUser function.
 * - the getCurrentUser function will return information about the authenticated user.
 * For more info: se getCurrentUser
 *
 * The authentication can fail due to,
 * - wrong username or password, is dealt by the helper function isError.
 * - missing authorization token in the response, is dealt with by the isAuthorized helper function.
 * - unable to get the current user information after authentication and authorization is done.
 * For more info: se getCurrentUser
 *
 * @param url
 * @param username
 * @param password
 * @returns {Promise}
 */
const logIn = ( url, username, password ) => {
  
  // Return a promise
  return new Promise( function( resolve, reject ) {
  
    // Set options such as method, headers, body, etc.
    let options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
      credentials: "omit"
    };
  
    // Authenticate via fetch API.
    fetch( url, options )
      .then( status )               // Check status code
      .then( json )                 // Get the response as json
      .then( isError )              // Application error in the response?
      .then( isAuthorized )         // Authorization token returned in the response?
      .then( getCurrentUser )       // Get current user information
      .then( function( user ) {
        
        // Resolve promise and pass user information
        resolve( user )
        
      }).catch( function( error ) {
        
        // Reject promise and pass error information.
        reject( error );
      
    });
    
  });
  
};


/**
 * Logout function
 *
 * This function just clear the store
 */
const logOut = () => {
  Store.logOut();
};


/**
 * Sign up API against the /auth/signup end point
 * This end point is public and no authorization token is needed.
 *
 * @param url
 * @param body
 * @returns {Promise}
 */
const SignUp = ( url, body ) => {
  
  // Return a promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: body,
      credentials: "omit"
    };
  
    // TODO: Add functionality to set authorization token.
    fetch( url, options )
      .then( status )               // Check status code
      .then( json )                 // Get the response as json
      .then( isError )              // Application error in the response?
      .then( function( data ) {
        resolve( data );
      }).catch( function( error ) {
        reject( error );
    });
    
  });
  
};

/**
 * Export the api
 */
export { getCurrentUser, logIn, logOut, SignUp };



