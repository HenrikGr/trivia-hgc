/*!
 * Description: LoginForm ES2015 Class component
 *
 * For the LoginForm component we are using the withRouter API from React router, which is a HoC (higher order component)
 * that wraps the LoginForm component to provide access to the router via this.props.router. This in turn gives
 * us a possibility to redirect to other routes within the application.
 *
 * We do also have access to the global services such as theme and store api to handle token and session management.
 * Every time the component has been mounted, we check if there is a session time out that caused the login component
 * being accessed, we do this in order to be able to render a message to the user about session time out.
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created on 2016-10-02
 */

// Module dependencies
import React from 'react'
import { withRouter } from 'react-router'
import { RaisedButton, TextField} from 'material-ui';

// Import auth api
import { logIn } from '../../modules/auth';

/**
 * LoginForm component.
 */
class LoginForm extends React.Component {
  
  /**
   * Dependency injection via contextTypes from the base component.
   * @type {{muiTheme: *, store: *}}
   */
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  };
  
  /**
   * Constructor
   * @param props
   * @constructor
   */
  constructor( props ) {
    super( props );
    
    // Set initial state
    this.state = { message: '', errors: {} };
    
    // Methods follow the same semantics as regular ES6 classes, meaning that they don't automatically bind
    this.doSubmit = this.doSubmit.bind( this );
  }
  
  /**
   * Check if we entered this component via a session time out.
   */
  componentDidMount() {
    
    // If session time out flag is set
    if( this.context.store.isSessionTimeout() ) {
      this.setState({
        message: 'Session time out, please log in again.'
      });
    }
  
  }
  
  /**
   * Submit the login form and authenticate.
   * @param event
   */
  doSubmit( event ) {
    event.preventDefault();
    
    let self = this;
    let username = this.refs.username.getValue();
    let password = this.refs.password.getValue();
    
    // Authenticate
    logIn('/auth/login', username, password )
      .then( function( data ) {
        self.props.router.replace('/');
      }).catch( function( error ) {
        self.setState( error );
      });
    
  }
  
  /**
   * Render the login form
   * @returns {XML}
   */
  render() {

    return (
      
      <div id="container" style={this.context.muiTheme.loginForm.container}>
        <div id="form-row" className="row" style={this.context.muiTheme.loginForm.formRow}>
          <div className="col-lg-4 col-lg-offset-4">
            <div className="box" style={this.context.muiTheme.loginForm.columnBox}>
              <h2>Log in with your e-mail</h2>
              {this.state.message ? <p className="error-message">{this.state.message}</p> : <p><br/></p>}
              <form onSubmit={this.doSubmit}>
                <TextField
                  ref="username"
                  type="text"
                  id="username"
                  fullWidth={true}
                  floatingLabelText="Email"
                  errorText={this.state.errors.username}
                /><br/>
                <TextField
                  ref="password"
                  type="password"
                  id="password"
                  fullWidth={true}
                  floatingLabelText="Password"
                  errorText={this.state.errors.password}
                /><br/><br/>
                <RaisedButton
                  type="submit"
                  label="Login"
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
 * Export the LoginForm component wrapped in withRouter HoC
 */
export default withRouter( LoginForm );