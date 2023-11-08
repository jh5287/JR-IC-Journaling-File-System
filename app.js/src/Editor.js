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



function Editor(){
    const ref = useRef(null);
    const [files, setFiles] = useState([]);
    //const [files, setFiles] = useState([Array(6).fill(null)])
    function handleClick(value) {
        window.alert(value)
        return console.log(value)
    }
    const handleSaveClick = event => {
        // 👇️ access textarea value
        window.alert(`You saved: ${ref.current.value}`)
        console.log(ref.current.value);
      };

      const handleDeletClick = event => {

      }
      const handleNewClick = event => {
        const nextFile = [...files.slice(0, files.length + 1), "file" + (files.length + 1)]
        setFiles(nextFile)
      };

      const addedFiles = files.map( (val, index) => {
          let description = val
          return(
              <li key={index}>
                  <button>{description}</button>
              </li>) 
          });
      
    return (
         <div className="editorContainer">
            <h1>Text Editor</h1>
            <textarea
                ref={ref}
            />
            <ul>{addedFiles}</ul>
            <footer>
                <Button value={'Save'} onButtonClick={handleSaveClick}/>
                <Button value={'New'} onButtonClick={() => handleNewClick()}/>
                <Button value={'Delete'} onButtonClick={handleDeletClick}/>
                <Button value={'Recover'} onButtonClick={() => handleClick('Recover')}/>
            </footer>
            
         </div>


    );
}


export default Editor;