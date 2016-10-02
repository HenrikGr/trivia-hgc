/*
 * Description: 
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-08-31
 */
let cfenv         = require('cfenv');                   // Get cloud foundry environments
let appEnv        = cfenv.getAppEnv();                  // Get application environment

// Config object to export
let config  = {};

/**
 * Check if local
 */
if( appEnv.isLocal ) {
  config = {
    port: appEnv.port,
    url: appEnv.url,
    apiHost: 'localhost',
    apiPort: 6004
  };
}
else {
  config = {
    port: appEnv.port,
    url: appEnv.url,
    apiHost: 'rest-hgc.eu-gb.mybluemix.net',
    apiPort: 80
  };
}


/**
 * Export config info
 * @type {{}}
 */
module.exports = config;
