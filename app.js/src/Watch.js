import './styles.css';
import React, {useState} from 'react';

const fileButton = ({value, onFileClick}) => {

    return(
        <button className='file' onClick={onFileClick}>
            {value}
        </button>
    );
}


function Watch(){


    return(
        <div className='watchContainer'>
            <h1>Watched Folder</h1>
            <div className='fileList'>
                <ul>{fileButton}</ul>
            </div>
        </div>
    );
}


export default Watch;