/*!
 * Description: REST API for the user model.
 *
 * The user API consist of;
 * - getAvatarById    = GET /api/users/:id/avatar
 * - updateAvatarById = PUT /api/users/:id/avatar
 * - getUsers         = GET /api/users
 * - getUserById      = GET /api/users/:id
 * - createUser       = POST /api/users (*)
 * - updateUserById   = PUT /api/users/:id
 * - deleteUserById   = DELETE /api/users/:id
 *
 * All POST/PUT ops must use a form with the Content_Type set to "application/x-www-form-urlencoded; charset=UTF-8"
 * All GET or DELETE ops must set the Content_Type to "application/json",
 *
 * For all routes that require authorization, the header must also include
 * "Authorization": Bearer<authorization token>.
 *
 * (*), is open route(s) that does not require authorization or authentication.
 *
 *
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-08-02
 */
// fetch polyfill
import 'whatwg-fetch';

// Import helper function to use for fetch status validation and response management
import { status, json, blob } from './fetch-utils';

// Import storage api
import Store from './store';


/**
 * API to get a users avatar image.
 *
 * @method: GET
 * @requires: Authorization token
 * @param url: /api/users/:id/avatar
 * @returns {Promise}
 */
const getAvatarById = ( url ) => {
  
  // Return a promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "GET",
      headers: {
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      credentials: "omit"
    };
  
    // Get the avatar
    fetch( url, options )
      .then( status )                   // Check status code
      .then( blob )                     // Extract image data buffer as a blob
      .then( function( blob ) {
        resolve( blob );
      }).catch( function( error ) {
        reject( error );
    });
    
  });
  
};

/**
 * API to update the avatar image of a user
 *
 * @method: PUT
 * @requires: Authorization token
 * @param url: /apu/avatars/:id
 * @param body:
 * @returns {Promise}
 */
const updateAvatarById = ( url, body ) => {
  
  // Return promise
  return new Promise( function( resolve, reject ) {
    
    let options = {
      method: "PUT",
      headers: {
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      body: body,
      credentials: "omit"
    };
  
    fetch( url, options )
      .then( status )
      .then( blob )
      .then( function( blob ) {
        resolve( blob );
      }).catch( function( error ) {
        reject( error );
      });
    
  });
  
};


/**
 *
 * @param url
 * @returns {Promise}
 */
const getUsers = ( url ) => {
  
  // Return Promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      credentials: "omit"
    };
  
    // Get the data
    fetch( url, options )
      .then( status )
      .then( json )
      .then( function( json ) {
        resolve( json );
      }).catch( function( error ) {
        reject( error );
      });
  
  });
  
};


/**
 * GET /api/users/:id
 *
 * @param url
 * @returns {Promise}
 */
const getUserById = ( url ) => {
  
  // Return Promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      credentials: "omit"
    };
  
    // Get the data
    fetch( url, options )
      .then( status )
      .then( json )
      .then( function( json ) {
        resolve( json );
      }).catch( function( error ) {
        reject( error );
      });
    
  })
  
};

/**
 *
 * @param url
 * @param body
 * @returns {Promise}
 */
const createUser = ( url, body ) => {
  
  // Return promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      body: body,
      credentials: "omit"
    };
  
    fetch( url, options )
      .then( status )
      .then( json )
      .then( function( json ) {
        resolve( json );
      }).catch( function( error ) {
        reject( error );
      });
  
  });
  
};


/**
 *
 * @param url
 * @param body
 * @returns {Promise}
 */
const updateUserById = ( url, body ) => {
  
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      body: body,
      credentials: "omit"
    };
  
    fetch( url, options )
      .then( status )
      .then( json )
      .then( function( json ) {
        resolve( json );
      }).catch( function( error ) {
        reject( error );
      });
  
  });
  
};

/**
 * Export User API object
 */

export { getAvatarById, updateAvatarById, getUsers, getUserById, createUser, updateUserById };