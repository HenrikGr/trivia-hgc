/*!
 * Description: Fetch utility module
 *
 * This module contains helper function for the fetch API.
 * Helper functions are;
 *
 * - status, that validate response statuses
 * - json, that returning the response stream into json format.
 * - blob, that returning a blob from response stream.
 * - b64toBlob, that returning a blob from a base64 data stream.
 *
 * - isAuthorized, function that checks if authorization token exist after authentication.
 * - isError, checks for application errors
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-08-24
 */
// Polyfill
import 'whatwg-fetch';

// Import store api
import Store from './store';

// Import application error module
import AppError from './error';


/**
 * Helper function to deal with response statuses
 * @param response
 * @returns {Promise.<*>}
 */
function status(response) {
  
  // Handle responses that are ok
  if ( (response.status >= 200 && response.status < 300) ) {
    return Promise.resolve(response)
  }
  else {
    return Promise.reject(new AppError(response.statusText, response.status));
  }
}

/**
 * Helper function that returning the response stream into json format
 * @param response
 * @returns {*}
 */
function json(response) {
  return response.json();
}

/**
 * Helper function to convert response stream to blob
 * @param response
 * @returns {*}
 */
function blob(response) {
  return response.blob();
}

/**
 * Helper function to create a blob from base64 data
 * @param b64Data
 * @param contentType
 * @param sliceSize
 * @returns {*}
 */
const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  
  return new Blob(byteArrays, {type: contentType});
};

/**
 * Helper function to validate if response json contains an authorization token or not.
 * @param json
 * @returns {Promise.<*>}
 */
const isAuthorized = ( json ) => {
  
  // Handle responses that are ok
  if ( json.authToken ) {
    
    // Store the token in the local storage
    Store.setAuthorizationToken( json.authToken );
    
    // Resolve the promise
    return Promise.resolve( json )
  }
  else {
    // Reject the promise
    return Promise.reject( new AppError('Authorization token missing') );
  }
  
};

/**
 * Helper function to detect if application error is returned.
 * @param json
 * @returns {Promise.<*>}
 */
const isError = ( json ) => {
  
  // No errors
  if ( !json.errors ) {
    
    // Resolve the promise
    return Promise.resolve( json );
  }
  else {
    
    // Reject the promise
    return Promise.reject( json );
  }
  
};


// Export the helper functions
export { status, json, blob, b64toBlob, isError, isAuthorized }

