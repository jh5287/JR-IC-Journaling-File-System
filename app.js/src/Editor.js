import './styles.css';
import line_diff from './line_diff.js'
import {useState} from 'react'



function Button({value, onButtonClick, disabled}){
    
    return (
        <button style={{fontSize: "large"}}
        className="button" onClick={onButtonClick}
        disabled={disabled}
        >
            {value}
        </button>
    );
}

function CurrentFileDisplay({currentFile}){
    let descripStart = "Current selected file is file";
    let descripEnd = ".txt"
    if(currentFile !== undefined)
        return(
         <div className='currentFile'>{descripStart + (currentFile+1) + descripEnd}</div>
        );
}


function Editor({textContent, files, setFiles, currentFile, fileContent, setFileContent, fileChanges, setFileChanges}){
    const [fileCount, setFileCount] = useState(1)


    const handleSave = ({currentFile, fileContent, setFileContent, fileChanges, setFileChanges}) => {
        
        let old_content = fileContent
        let old_lines = old_content[currentFile]
        console.log("old lines", old_lines)
        
        let new_lines = textContent.current.value
        
        let new_content = fileContent.map((value, index) => {
            if(index === currentFile){
                return textContent.current.value
            }
            return value
        });
        let changes = line_diff(old_lines, new_lines)
        console.log("changes", changes)

        let updateFileChanges = fileChanges.map((value, index) => {
            if(index === currentFile){
                return value + changes
            }
            return value
        });

        console.log("update file changes", updateFileChanges)
        setFileChanges(updateFileChanges)
        console.log("file changes", fileChanges)
        setFileContent(new_content);
    }

    function handleClick(value) {
        window.alert(value)
        return console.log(value)
    }

    const handleDeleteClick = ({files, setFiles, fileContent, setFileContent}) => {
        let deleteItem = prompt("Which text file would you like to remove?", "Choose an existing file");
        deleteItem = Number(deleteItem) - 1;
        const newFiles = files.filter((_, idx) => idx !== deleteItem)
        fileContent.splice(deleteItem, 1);
        setFiles(newFiles);
        setFileContent(fileContent);
    }

    
    const handleNewClick = ({files, setFiles}) => {
        if (files.length === 10){
            setFiles(files)
        }
        else{
            const nextFiles = [...files.slice(0, files.length + 1), "file" + (fileCount) + ".txt"];
            setFiles(nextFiles);
            setFileCount(fileCount +1);
            const newContent = [...fileContent.slice(0, fileContent.length + 1), ""];
            //for(var i = 0; i < newContent.length; i++){
            //    console.log(newContent[i])
            //}
            setFileContent(newContent)
            
        }
    };



    return (
         <div className="editorContainer">
            <h1>Text Editor</h1>
            <CurrentFileDisplay 
            currentFile={currentFile} 
            />
            <textarea
                ref={textContent}
            />
            <footer>
                <Button value={'Save'} onButtonClick={() => handleSave({currentFile, fileContent, setFileContent, fileChanges, setFileChanges})} disabled={currentFile === undefined}/>
                <Button value={'New'} onButtonClick={() => handleNewClick({files, setFiles})}/>
                <Button value={'Delete'} onButtonClick={() => handleDeleteClick({files, setFiles, fileContent, setFileContent})}/>
                <Button value={'Recover'} onButtonClick={() => handleClick('Recover')}/>
            </footer>
            
         </div>


    );
}

//DISABLE SAVE BUTTON UNTIL THERE ARE TEXT FILES TO SAVE TO
//Make sure a text file is selected before the save button can be enabled
export default Editor;