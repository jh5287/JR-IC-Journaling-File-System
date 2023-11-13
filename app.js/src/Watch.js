import './styles.css';
import React from 'react';

function FileButtons({name, onButtonClick}) {
    return(
            <button onClick={onButtonClick}>{name}</button>
        ) 
};


function FileList({files, setCurrentFile}) {
    const changeCurrentFile = ({name, setCurrentFile}) => {
        setCurrentFile(name);
    }
      const addedFiles = files.map( (val, index) => {
          let name = val;
          return(
              <FileButtons
                key={index}
                name={name}
                onButtonClick={() => changeCurrentFile({name, setCurrentFile})}
              />) 
          });
    return (
        <div>{addedFiles}</div>
    );
}



function Watch({files, setCurrentFile}){
    //const [myFiles, setMyFiles] = useState([files])
    
    return(
        <div className='watchContainer'>
            <h1>Watched Folder</h1>
            <div className='fileList'>
                <FileList
                files={files}
                setCurrentFile={setCurrentFile}
                />
            </div>
        </div>
    );
}


export default Watch;