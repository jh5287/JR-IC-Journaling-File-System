import './styles.css';
import {useState} from 'react'
import { saveAs } from 'file-saver';



function Button({value, onButtonClick}){
    
    return (
        <button style={{fontSize: "large"}}
        className="button" onClick={onButtonClick}>
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
        //const fileData = JSON.stringify(ref.current.value);
        //const file = new Blob([fileData], { type: 'text/plain;charset=utf-8' });
        //saveAs(file, currentFile);
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
        files.splice(deleteItem, 1);
        fileContent.splice(deleteItem, 1);
        console.log("New content:", fileContent);
        setFiles(files);
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
                <Button value={'Save'} onButtonClick={() => handleDownload({currentFile, fileContent, setFileContent})}/>
                <Button value={'New'} onButtonClick={() => handleNewClick({files, setFiles})}/>
                <Button value={'Delete'} onButtonClick={() => handleDeleteClick({files, setFiles, fileContent, setFileContent})}/>
                <Button value={'Recover'} onButtonClick={() => handleClick('Recover')}/>
            </footer>
            
         </div>


    );
}


export default Editor;