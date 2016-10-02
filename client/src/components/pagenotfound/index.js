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
import { Link } from 'react-router'
import { RaisedButton } from 'material-ui';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

let styles = {
  marginTop: '80px'
};


/**
 *
 */
export default class PageNotFound extends React.Component {

  
  render() {
    
    return (

      <div className="row center-lg">
        <div className="col-lg-6">
          <div className="box">
            
            <Card style={styles}>
              <CardMedia>
                <img src="/pics/404.jpg" />
              </CardMedia>
              <CardActions>
                  <RaisedButton
                    containerElement={<Link to="/" />}
                    label="HOME"
                  />
              </CardActions>
            </Card>
            
          </div>
        </div>
      </div>
    )
  }
}