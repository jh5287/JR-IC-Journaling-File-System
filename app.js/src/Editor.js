import './styles.css';
import {useRef} from 'react';
import { saveAs } from 'file-saver';



function Button({value, onButtonClick}){
    
    return (
        <button style={{fontSize: "large"}}
        className="button" onClick={onButtonClick}>
            {value}
        </button>
    )
}

function CurrentFileDisplay({currentFile}){
    let description = "Current selected file is ";
    if(currentFile !== undefined)
        return(
         <div className='currentFile'>{description + currentFile}</div>
        );
}


function Editor({files, setFiles, currentFile}){
    const ref = useRef(null);
    
    const handleDownload = () => {
        const fileData = JSON.stringify(ref.current.value);
        const file = new Blob([fileData], { type: 'text/plain;charset=utf-8' });
        saveAs(file, currentFile);
    }

    function handleClick(value) {
        window.alert(value)
        return console.log(value)
    }
    const handleSaveClick = () => {
        window.alert(`You saved: ${ref.current.value}`)
        console.log(ref.current.value);
      };

    const handleDeleteClick = ({files, setFiles}) => {
        let deleteItem = prompt("Which text file would you like to remove?", "Choose an existing file");
        deleteItem = Number(deleteItem) - 1;
        files.splice(deleteItem, 1);
        const changedFiles = files;
        setFiles(changedFiles);
    }

    const handleNewClick = ({files, setFiles}) => {
        if (files.length === 10){
            const sameFiles = files;
            setFiles(sameFiles)
        }
        else{
            const nextFiles = [...files.slice(0, files.length + 1), "file" + (files.length + 1) + ".txt"];
            setFiles(nextFiles);
        }
    };
    return (
         <div className="editorContainer">
            <h1>Text Editor</h1>
            <CurrentFileDisplay 
            currentFile={currentFile} 
            />
            <textarea
                ref={ref}
            />
            <footer>
                <Button value={'Save'} onButtonClick={handleDownload}/>
                <Button value={'New'} onButtonClick={() => handleNewClick({files, setFiles})}/>
                <Button value={'Delete'} onButtonClick={() => handleDeleteClick({files, setFiles})}/>
                <Button value={'Recover'} onButtonClick={() => handleClick('Recover')}/>
            </footer>
            
         </div>


    );
}


export default Editor;