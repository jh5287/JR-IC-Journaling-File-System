import './styles.css';
import {useRef, useState} from 'react';
function Button({value, onButtonClick}){
    
    return (
        <button style={{fontSize: "large"}}
        className="button" onClick={onButtonClick}>
            {value}
        </button>
    )
}



function Editor({txtFiles, setTxtFiles}){
    const ref = useRef(null);
    


    function handleClick(value) {
        window.alert(value)
        return console.log(value)
    }
    const handleSaveClick = () => {
        // 👇️ access textarea value
        window.alert(`You saved: ${ref.current.value}`)
        console.log(ref.current.value);
      };

      const handleDeletClick = () => {

      }
      const handleNewClick = ({txtFiles}) => {
        if (txtFiles.length == 10){
            const sameFiles = [...txtFiles.slice(0, 10)];
            setTxtFiles(sameFiles)
        }
        else{
            const nextFiles = [...txtFiles.slice(0, txtFiles.length + 1), "file" + (txtFiles.length + 1) + ".txt"];
            setTxtFiles(nextFiles);
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
                <Button value={'New'} onButtonClick={() => handleNewClick({txtFiles, setTxtFiles})}/>
                <Button value={'Delete'} onButtonClick={handleDeletClick}/>
                <Button value={'Recover'} onButtonClick={() => handleClick('Recover')}/>
            </footer>
            
         </div>


    );
}


export default Editor;