/*
 * Description: 
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-10-02
 */
// Module dependencies
import React from 'react';
import { withRouter } from 'react-router';
import { RaisedButton, FlatButton, TextField, Checkbox } from 'material-ui';
import DropzoneContainer  from './dropzone-container';

// Import database javascript library
import { getUserById, updateUserById } from '../../modules/user';

// Import store api
import Store from '../../modules/store';


/**
 * ProfileForm component class
 */
class ProfileForm extends React.Component {
  
  /**
   * Constructor
   * @param props
   * @constructor
   */
  constructor(props) {
    super( props );
    
    //'username name firstName lastName email phone active avatar admin created updated';
    // Set initial state
    this.state = {
      error: '',
      _id: '',
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      active: false,
      admin: false
    };
    
    // Methods follow the same semantics as regular ES6 classes, meaning that they don't automatically bind
    // this to the instance.
    this.doSubmit = this.doSubmit.bind( this );
    this.doChange = this.doChange.bind( this );

  }
  
  /**
   * Get the current user information from the api/users/:id route.
   * This will be run only once, before the component will mount, meaning it also will be run if
   * the user refreshes the page.
   *
   * If we get a session time out, route to the login form.
   */
  componentDidMount() {
    let self = this;
    let url = '/api/users/' + this.props.params.id;
  
    // Get user information
    getUserById( url )
      .then( function( data ) {
        self.setState( data );
      }).catch( function( error ) {
        self.setState( {error: error} );
      });
  }
  
  
  /**
   * Submit the edit profile form.
   * @param event
   */
  doSubmit( event ) {
    
    // Prevent submitting the form, we submitting it via fetch
    event.preventDefault();
  
    //'name firstName lastName email phone active admin';
    let name = 'name=' + encodeURIComponent(this.refs.name.getValue());
    let firstName = '&firstName=' + encodeURIComponent(this.refs.firstName.getValue());
    let lastName = '&lastName=' + encodeURIComponent(this.refs.lastName.getValue());
    let email = '&email=' + encodeURIComponent(this.refs.email.getValue());
    let phone = '&phone=' + encodeURIComponent(this.refs.phone.getValue());
    let active = '&active=' + this.state.active;
    let admin = '&admin=' + this.state.admin;
    let body = name + firstName + lastName + email + phone + active + admin;
    let self = this;
    let url = '/api/users/' + this.props.params.id;
    
    // Update user
    updateUserById( url, body )
      .then( function( user ) {
      
        // Set the updated user information in the storage
        Store.setCurrentUser( user );
      
        // Update state with returned user information
        self.setState( user );
        
      }).catch( function( error ) {
        self.setState( {error:error} );
      });
  }
  
  
  /**
   * Event handler for data binding of the input elements
   * @param event
   */
  doChange( event, value ) {
    var nextState = {};
    nextState[event.target.name] = value;
    this.setState(nextState);
  }
  
  /**
   * Render the Edit user form
   * @returns {XML}
   */
  render() {

    return (
      <div id="container" style={{marginTop:'12px'}}>
        
        <div id="header-row" className="row">
          <div className="col-lg-6 col-lg-offset-3">
            <div className="box"  style={{marginLeft:'24px'}}>
              <h2>Update profile</h2>
              {this.state.error ? <p className="error-message">{this.state.error}</p> : <p><br/></p>}
            </div>
          </div>
        </div>
        
        <div id="form-row" className="row">
          
          <div className="col-lg-1 col-lg-offset-3">
            <div className="box" style={{marginLeft:'24px'}}>
              {this.state._id ?
                <DropzoneContainer
                  id={this.state._id}
                />
                :
                <div></div>
              }
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="box" style={{marginLeft:'24px'}}>
              <form id="edit-profile" onSubmit={this.doSubmit}>
                <TextField
                  ref="name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  fullWidth={true}
                  floatingLabelText="Name"
                  onChange={this.doChange}
                /><br/>
                <TextField
                  ref="firstName"
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  fullWidth={true}
                  floatingLabelText="First name"
                  onChange={this.doChange}
                /><br/>
                <TextField
                  ref="lastName"
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  fullWidth={true}
                  floatingLabelText="Last Name"
                  onChange={this.doChange}
                /><br/>
                <TextField
                  ref="email"
                  name="email"
                  type="text"
                  value={this.state.email}
                  fullWidth={true}
                  floatingLabelText="Email"
                  onChange={this.doChange}
                /><br/>
                <TextField
                  ref="phone"
                  name="phone"
                  type="text"
                  value={this.state.phone}
                  fullWidth={true}
                  floatingLabelText="Phone"
                  onChange={this.doChange}
                /><br/><br/>
                <Checkbox
                  name="active"
                  label="Active account"
                  labelPosition="right"
                  checked={this.state.active}
                  onCheck={this.doChange}
                /><br/>
                <Checkbox
                  name="admin"
                  label="Admin"
                  labelPosition="right"
                  checked={this.state.admin}
                  onCheck={this.doChange}
                /><br/>
                <RaisedButton
                  type="submit"
                  label="Save"
                  primary={true}
                />
              </form>
            </div>
          </div>
          
        </div>
          
      </div>
    )
  }
}


/**
 * Make sure the theme will be available further down the component tree.
 * Child components access the theme by using context.muiTheme (prop).
 * @type {{muiTheme: (*|boolean)}}
 */
ProfileForm.contextTypes  = {
  muiTheme: React.PropTypes.object.isRequired
};


/**
 * Export the ProfileForm component wrapped in withRouter HoC
 */
export default withRouter( ProfileForm );