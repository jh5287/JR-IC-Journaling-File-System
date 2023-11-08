import './styles.css';
import React, {useState} from 'react';


function FileButtons({txtFiles}) {
      const addedFiles = txtFiles.map( (val, index) => {
          let description = val
          return(
              <li key={index}>
                  <button>{description}</button>
              </li>) 
          });
    return (
        <ul>{addedFiles}</ul>
    );
}

function Watch({txtFiles}){

    return(
        <div className='watchContainer'>
            <h1>Watched Folder</h1>
            <div className='fileList'>
                <FileButtons
                txtFiles={txtFiles}
                />
            </div>
        </div>
    );
}


export default Watch;