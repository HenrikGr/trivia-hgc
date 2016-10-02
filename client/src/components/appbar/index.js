/*!
 * Description: Application bar stateless function component
 *
 * The application bar component will will display a login button or a profile menu component
 * dependent on if the user is authenticated or not.
 *
 * The component gets "global" dependencies from the base component such as;
 *
 * - muiTheme, the theme of the application,
 * - store, object to be used against localStorage for token and session management
 *
 *
 *
 * Author:  Henrik
 * File:
 * Version: 0.0.1
 *
 * Created on 2016-10-02
 */

// Import react and react router
import React from 'react';
import { Link } from 'react-router'

// Use toolbar component for the application bar
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import IconButton from 'material-ui/IconButton';

// Import the profile menu container component.
import ProfileMenuDrawer from './profile-menu-drawer';


/**
 * AppBar stateless function component.
 *
 * @param props
 * @param context
 * @returns {XML}
 * @constructor
 */
const AppBar = (props, context) => {
  
  // Checks if authorization token is stored in the local store
  const isAuth = context.store.isLoggedIn();
  
  // Get current user information from the local store API
  const currentUser = context.store.getCurrentUser();

  // Return the app bar to be rendered
  return (
    <Toolbar
      style={{backgroundColor: context.muiTheme.appBar.backgroundColor}}
    >
      <ToolbarGroup firstChild={true}>
        <IconButton containerElement={<Link to="/" />} ><AppsIcon /></IconButton>
        <ToolbarTitle text={props.appName} />
      </ToolbarGroup>
      { isAuth ?
        <ToolbarGroup>
          <ProfileMenuDrawer
            user={currentUser}
          />
        </ToolbarGroup>
        :
        <ToolbarGroup>
          <MenuItem containerElement={<Link to="/login" />} primaryText="Login"/>
        </ToolbarGroup>
      }
    </Toolbar>
  );
  
};

// Props for the component.
AppBar.propTypes = {
  appName: React.PropTypes.string.isRequired
};

// Default value for the props.
AppBar.defaultProps = {
  appName: 'MDG - Trivia APP'
};

// Context to access global information set in the Base component.
AppBar.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};

/**
 * Export the AppBar component
 */
export default AppBar;