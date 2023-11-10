import './styles.css';
import {useRef} from 'react';
function Button({value, onButtonClick}){
    
    return (
        <button style={{fontSize: "large"}}
        className="button" onClick={onButtonClick}>
            {value}
        </button>
    )
}



function Editor({files, setFiles}){
    const ref = useRef(null);

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
            <textarea
                ref={ref}
            />
            <footer>
                <Button value={'Save'} onButtonClick={handleSaveClick}/>
                <Button value={'New'} onButtonClick={() => handleNewClick({files, setFiles})}/>
                <Button value={'Delete'} onButtonClick={() => handleDeleteClick({files, setFiles})}/>
                <Button value={'Recover'} onButtonClick={() => handleClick('Recover')}/>
            </footer>
            
         </div>


    );
}


export default Editor;