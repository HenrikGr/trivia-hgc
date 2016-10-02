/*!
 * Description: DropZone container component
 *
 * The purpose of this component is to manage the interaction for the users profile avatar.
 *
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-10-02
 */
// Module dependencies
import React from 'react';
import { withRouter } from 'react-router'
import { FlatButton } from 'material-ui';
import Dropzone  from './dropzone';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';

// Import avatar API
import { getAvatarById, updateAvatarById } from '../../modules/user';


/**
 * DropZone container component
 */
class DropzoneContainer extends React.Component {
  
  constructor( props ) {
    super(props);
    
    this.state = {
      errorMessage: '',
      files: []
    };
  
    this.onDrop = this.onDrop.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.renderFileName = this.renderFileName.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  
  }
  
  /**
   * On mounting, get the users avatar image from the REST services
   * The REST service is returning en encoded string
   */
  componentDidMount() {
    
    let self = this;
    let url = '/api/users/' + this.props.id + '/avatar';
  
    // Get user avatar
    getAvatarById( url )
      .then( function( blob ) {
      let files = [];
      let file = { preview: URL.createObjectURL( blob ) };
        
      files.push(file);
      self.setState({files: files});
      
    }).catch( function( error ) {
      console.log(error);
    });
    
  }
  
  /**
   * On drop event method to manage when user has uploaded an image
   * This method should replace the uploaded image in the back-end and in the local store
   * in order to instant display the new avatar if necessary.
   * @param files
   */
  onDrop( files ) {
  
    let self = this;
    let url = '/api/users/' + this.props.id + '/avatar';
    
    let data = new FormData();
    data.append('avatarImage', files[0]);
    
    /**
     * Update the dropped image to the database
     * TODO: Check this method to replaceAvatarById, which should call updateAvatarById and getAvatarById.
     */
    updateAvatarById( url, data )
      .then( function( blob ) {
        let files = [];
        let file = { preview: URL.createObjectURL( blob ) };
  
        files.push(file);
        self.setState({files: files});
      
      }).catch( function( error ) {
        console.log( error );
      });
  }
  
  onFileUpload() {
    this.refs.dropzone.open();
  }
  
  /**
   * Render the uploaded file name
   * @returns {*}
   */
  renderFileName() {
    if( this.state.files.length > 0 ) {
      return(
        <span>{this.state.files.map((file, i) => <span key={i}>{file.name}</span> )}</span>
      )
    }
    else {
      return '';
    }
  }
  
  /**
   * Render the uploaded file as preview
   *
   * @returns {*}
   */
  renderPreview() {
    if( this.state.files.length > 0 ) {
      return(
        <span style={{minWidth:'inherit', width:'inherit'}}>{this.state.files.map((file, i) =>
          <img style={{minWidth:'inherit', width:'inherit'}} key={i} src={file.preview} /> )}
        </span>
      )
    }
    else {
      return(
        <span style={{backgroundColor:'black', minWidth:'inherit', width:'inherit'}}><br/></span>
      )
    }
  }
  
  render() {
  
    let styles = {
      imageContainer: {
        minHeight: '140px',
        width:'120px',
        minWidth: '120px',
        borderStyle: 'solid',
        borderRadius: '3px',
        borderColor: 'white',
        backgroundColor:'black'
      }
    };
    
    return (
      <div>
        <Dropzone
          ref="dropzone"
          name="avatarImage"
          style={{display:'none'}}
          multiple={false}
          onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <div className="profile-image-container" style={styles.imageContainer}>
          {this.renderPreview()}
        </div><br/>
        <FlatButton
          icon={<FileUploadIcon/>}
          label="Upload"
          secondary={true}
          onClick={this.onFileUpload}
        /><br/><br/>
      </div>
    )
  }
}

export default withRouter(DropzoneContainer);