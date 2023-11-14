import './styles.css';
import React from 'react';


function Journal({currentFile}){
    if(currentFile !== undefined)
    return(
        <div className='journalContainer'>
            <h1>{"file"+ (currentFile + 1) + ".txt.dat"} </h1>
            <div className='journal'>
                
            </div>
        </div>
    );
}


export default Journal;