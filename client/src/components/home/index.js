/*!
 * Description: 
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created on 2016-10-02
 */
import React from 'react';


/**
 * Start page component
 * @type {*|Function}
 */
class Home extends React.Component {
  
  /**
   * Constructor
   * @param props
   * @constructor
   */
  constructor(props) {
    super(props);
  }
  
  
  /**
   * Render component
   * @returns {XML}
   */
  render() {
   
    return (
      
      <div id="container" style={this.context.muiTheme.home.container}>
        
        <div id="campaign-row" className="row" style={this.context.muiTheme.home.campaignRow}>
          <div className="col-lg-6 col-lg-offset-3">
            <div className="box">
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Get the theme
 * @type {{muiTheme: (any)}}
 */
Home.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

/**
 * Export the home component
 */
export default Home;