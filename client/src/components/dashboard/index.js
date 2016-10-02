/*
 * Description: 
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created on 2016-10-02
 */
import React from 'react'


/**
 * Dashboard component
 * @type {any}
 */
class Dashboard extends React.Component {
  
  /**
   * Constructor
   * @param props
   * @constructor
   */
  constructor( props ) {
    super(props);
  }
  
  /**
   * Render component
   * @returns {XML}
   */
  render() {
    
    return (
      <div id="container" style={{marginTop:'12px', marginLeft:'24px'}}>
        <div className="row">
          <div className="col-lg-12">
            <div className="box">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Get the context types passed down from base component.
 * @type {{muiTheme: (any)}}
 */
Dashboard.contextTypes  = {
  muiTheme: React.PropTypes.object.isRequired
};


/**
 * Export the Dashboard component wrapped in withRouter HoC
 */
export default Dashboard;