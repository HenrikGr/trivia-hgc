/*!
 * Description: Module for the trivia API
 *
 * The contact API consist of;
 * - getTrivias         = GET /api/contacts
 * - getTriviasByTopic  = GET /api/contacts/:id
 *
 * All POST/PUT ops must use a form with the Content_Type set to "application/x-www-form-urlencoded; charset=UTF-8"
 * All GET or DELETE ops must set the Content_Type to "application/json",
 *
 * For all routes that require authorization, the header must also include
 * "x-access-token": <access token>. For more information, see the Authorization module.
 *
 * (*), POST /api/contacts is an open route that does not require authorization or authentication.
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-08-31
 */
// fetch polyfill
import 'whatwg-fetch';

// Import helper function to use for fetch status validation and response management
import { status, json } from './fetch-utils';

// Import storage api
import Store from './store';


/**
 * Trivia API class
 */
class triviaApi {
  
  // Get trivias
  getTrivias = ( url, callback ) => {
    
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      credentials: "omit"
    };
    
    fetch( url, options )
      .then( status )
      .then( json )
      .then( function( json ) {
        return callback( null, json );
      }).catch( function( error ) {
        return callback( error );
      });
    
  };
  
  // Get trivia by topic
  getTriviaByTopic = ( url, callback ) => {
    
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      credentials: "omit"
    };
    
    fetch( url, options )
      .then( status )
      .then( json )
      .then( function( json ) {
        return callback( null, json );
      }).catch( function( error ) {
        return callback( error );
      });
    
  };
  
  
}

/**
 * Export contactApi
 */
export default new triviaApi;