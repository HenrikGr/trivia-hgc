/*!
 * Description: Profile drawer component
 *
 * This component displays a menu for the current authenticated user as a drawer component.
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created on 2016-10-02
 */

// Module dependencies
import React from 'react';
import { Link, withRouter } from 'react-router'
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import CloseBtn from 'material-ui/svg-icons/navigation/cancel';


/**
 * ProfileMenuDrawer class
 */
class ProfileMenuDrawer extends React.Component {
  
  // Constructor
  constructor( props ) {
    super( props );
    
    // Initial state
    this.state = {
      open: false
    };
  
    // Bind event handlers
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onRequestChange = this.onRequestChange.bind(this);
  }

  
  // Event handler when toggle the state in the application bar.
  handleToggle() {
    this.setState({open: !this.state.open});
  }
  

  // Event handler when closing the drawer component
  handleClose() {
    this.setState({open: false});
  }

  
  // Event handler to open the drawer
  onRequestChange( open ) {
    this.setState({open:open})
  }
  
  // Create the menu header
  createMenuHeader() {
  
    // Ensure the image data will be base64 encoded
    const avatarImage = "data:image/png;base64," + this.props.user.avatarImage.data;
  
    return(
      <ListItem
        leftAvatar={<Avatar style={{top:'10px'}} src={avatarImage} />}
        primaryText={this.props.user.name}
        onTouchTap={this.handleToggle}
      />
    );
  }
  
  // Create the drawer
  createMenuDrawer() {
  
    // Ensure the image data will be base64 encoded
    const avatarImage = "data:image/png;base64," + this.props.user.avatarImage.data;
  
    return(
      <Drawer
        openSecondary={true}
        docked={false}
        onRequestChange={this.onRequestChange}
        open={this.state.open}
      >
        <List>
          <ListItem
            disabled={true}
            leftAvatar={<Avatar src={avatarImage} />}
            rightIcon={<CloseBtn style={{top:'0px'}} onTouchTap={this.handleClose} />}
            primaryText={this.props.user.name}
          />
          <ListItem
            style={{color:'white'}}
            disabled={true}
            primaryText="Inloggad"
            secondaryText={this.props.user.username}
          />
          <ListItem
            containerElement={<Link to={`/users/${this.props.user._id}`} />}
            onTouchTap={this.handleClose}
            primaryText="Edit profile"
          />
          <Divider />
          <ListItem
            containerElement={<Link to="/" />}
            onTouchTap={this.handleClose}
            primaryText="Dashboard"
          />
          <ListItem
            containerElement={<Link to="/trivia" />}
            onTouchTap={this.handleClose}
            primaryText="React Trivia"
          />
          <Divider />
          <ListItem
            containerElement={<Link to="/logout" />}
            onTouchTap={this.handleClose}
            primaryText="Logout"
          />
        </List>
      </Drawer>

    );
  }
  

  // Render the component
  render() {
    
    const menuHeader = this.createMenuHeader();
    const menuDrawer = this.createMenuDrawer();
    
    return (
      <div>
        {menuHeader}
        {menuDrawer}
      </div>
    )
  }
}

// Props for the component.
ProfileMenuDrawer.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default withRouter( ProfileMenuDrawer );
