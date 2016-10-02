/*!
 * Description: Module for the apps main entry point.
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created on 2016-07-07
 */
import React from 'react';
import ReactDom from 'react-dom';
import {browserHistory, Router} from 'react-router';
import routes from './config/routes';

/**
 * Render app
 */
ReactDom.render(
  (<Router
    history={browserHistory}
    routes={routes} />),
  document.getElementById('app')
);