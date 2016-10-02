/*!
 * Description: Module for an interface towards the localStorage.
 *
 * The module contains an object with methods to manage;
 * - authorization token,
 * - current user service information,
 * - session time out token.
 *
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-09-19
 */

// Store object, used to manage localStorage.
const Store = {
  
  // Check if store contains an authorization token
  isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
  },
  
  // Logout the user from the client, clears the localStorage
  logOut() {
    
    this.removeAuthorizationToken();
    this.removeCurrentUser();
    this.removeSessionTimeOut();
  },
  
  // Remove authorization token from localStorage
  removeAuthorizationToken() {
    if(localStorage.getItem('authToken') !== null ) {
      localStorage.removeItem('authToken');
    }
  },
  
  // Store the authorization token in the localStorage
  setAuthorizationToken( token ) {
    localStorage.setItem('authToken', token);
  },
  
  // Get the authorization token from localStorage
  getAuthorizationToken() {
    return localStorage.getItem('authToken');
  },
  
  // Remove the current user from localStorage
  removeCurrentUser() {
    if(localStorage.getItem('user') !== null ) {
      localStorage.removeItem('user');
    }
  },
  
  // Store current user service information in the localStorage
  setCurrentUser( user ) {
    localStorage.setItem('user', JSON.stringify( user ));
  },
  
  // Get the current user service information from the localStorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  },
  
  // Check if session time out flag is in the local storage
  // If so, remove it and returns true
  // If not, return false
  isSessionTimeout() {
    let flag = localStorage.getItem('timeout') !== null;
    
    if( flag ) {
      localStorage.removeItem('timeout');
    }
    
    return flag;
  },
  
  // Set session time out flag in the localStorage
  setSessionTimeOut( flag ) {
    localStorage.setItem('timeout', flag);
  },
  
  // Remove the session time out flag from local storage
  removeSessionTimeOut() {
    if(localStorage.getItem('timeout') !== null ) {
      localStorage.removeItem('timeout');
    }
  }
  
};

/**
 * Export the Store object
 */
export default Store;
