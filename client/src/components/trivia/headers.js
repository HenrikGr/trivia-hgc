/*!
 * Description:
 *
 *
 *
 * Author:  Henrik
 * File:
 * Version: 0.0.1
 *
 * Created on 2016-10-02
 */
import React from 'react';


const Headers = (props) => {
  
  let style = { width: props.headerWidth },
    headers = [];
  
  props.data.forEach((category, index) =>
    headers.push(<span className='header' style={style} key={index}>{category.category}</span>));
  
  return(
    <div className='headers'>
      {headers}
    </div>
  );
  
};


export default Headers;
