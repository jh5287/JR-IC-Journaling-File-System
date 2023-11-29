import './styles.css';
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


function Editor({textContent, files, setFiles, currentFile, fileContent, setFileContent}){
    const [fileCount, setFileCount] = useState(1)
    const handleDownload = ({currentFile, fileContent, setFileContent}) => {
        fileContent.splice((currentFile), 1, textContent.current.value);
        setFileContent(fileContent);
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
            for(var i = 0; i < newContent.length; i++){
                console.log(newContent[i])
            }
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
                <Button value={'Save'} onButtonClick={() => handleDownload({currentFile, fileContent, setFileContent})} disabled={currentFile === undefined}/>
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