import './styles.css';
import React from 'react';


function JournalDisplay({fileChanges, currentFile}){
    let index = currentFile
    let selectedFile = fileChanges[index]
    return(
        <div className='journal'>{selectedFile}</div>
    )
}



function Journal({files, currentFile, fileChanges, setFileChanges}){


    let line_diff = (old_lines, new_lines) => {
        let old_line_number = 1;
        let new_line_number = 1;
        let changes = '';
        while (old_line_number <= old_lines.length || new_line_number <= new_lines.length) {
            if (old_line_number > old_lines.length) {
                changes += `${Date()}\t\t\t+\t\t\tl${new_line_number}:${new_lines[new_line_number-1]}`;
                new_line_number += 1;
            } else if (new_line_number > new_lines.length) {
                changes += `${Date()}\t\t\t-\t\t\tl${old_line_number}:${old_lines[old_line_number-1]}`;
                old_line_number += 1;
            } else if (old_lines[old_line_number-1] !== new_lines[new_line_number-1]) {
                changes += `${Date()}\t\t\t-\t\t\tl${old_line_number}:${old_lines[old_line_number-1]}`;
                changes += `${Date()}\t\t\t+\t\t\tl${new_line_number}:${new_lines[new_line_number-1]}`;
                old_line_number += 1;
                new_line_number += 1;
            } else {
                old_line_number += 1;
                new_line_number += 1;
            }
        }
        return changes;
    }


    let setFileChangesHandler = ({currentFile, fileChanges, setFileChanges}) => {
        
    }
    
   let index = currentFile
   let selectedFile = files[index]

    if(currentFile !== undefined)
    return(
        <div className='journalContainer'>
            <h1>{(selectedFile) + ".dat"} </h1>
            <JournalDisplay
            fileChanges={fileChanges}
            currentFile={currentFile}
            />
        </div>
    );
}


export default Journal;