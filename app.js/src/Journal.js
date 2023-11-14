import './styles.css';
import React from 'react';


function Journal({currentFile}){
    
    return(
        <div className='journalContainer'>
            <h1>{currentFile + ".dat"} </h1>
            <div className='journal'>
                
            </div>
        </div>
    );
}


export default Journal;