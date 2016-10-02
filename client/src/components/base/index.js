/*!
 * Description: Base component for the application
 *
 * The Base component act as a router context provider in order to provide global data such as
 *
 * - muiTheme, the theme of the application,
 * - store, object to be used against localStorage for token and session management.
 *
 * By using the childContextTypes we ensure the global data is accessible for all descendant components, and
 * not only children.
 *
 *
 *
 * Author:  Henrik Grönvall
 * File:    
 * Version: 1.0.0
 *
 * Created on 2016-10-02
 */

// Import react
import React from 'react';

// Import application theme
import AppTheme from '../../theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap, http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// import local store API
import Store from '../../modules/store';

// Import the application header component (AppBar)
import AppBar from '../appbar';


/**
 * Base component for the application.
 */
class Base extends React.Component {
  
  /**
   * Use childContextTypes to implement dependency injection of the theme and store api.
   * @type {{muiTheme: *, store: *}}
   */
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  };
  
  // Constructor
  constructor( props ) {
    super( props );
  }
  
  // This will be called from descendant components when the state or props changed down the three.
  getChildContext() {
    return {
      muiTheme: getMuiTheme( AppTheme ),
      store: Store
    }
  }
  
  // Render the base component and include the header (navigation)  component
  render() {
    
    return(
      <div>
        <AppBar/>
        { /* child component will be rendered here */ }
        {this.props.children}
      </div>
    )
  }
}


/**
 * Export the base component
 */
export default Base;