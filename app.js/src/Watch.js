import './styles.css';
import React from 'react';


function FileButtons({name, onButtonClick}) {
    return(
            <button onClick={onButtonClick}>{name}</button>
        ) 
};


function FileList({textContent, files, setCurrentFile, fileContent}) {


    const changeCurrentFile = ({index, setCurrentFile}) => {
        setCurrentFile(index);
    }


    const updateTextArea = ({textContent, fileContent, index})=> {
        //need to check for length of array to determine which data to display
        //it just checks the name which is in the wrong location...maybe not splice the data but just fill with null if continue to check by name?
        if(fileContent[index] !== undefined)
            textContent.current.value = fileContent[index]
        //console.log(fileContent[index])
        //for(var i = 0; i < fileContent.length; i++){
        //    console.log(fileContent[i])
        //}
    }


    const handleMultiClick = ({textContent, fileContent, setCurrentFile, index}) => {
        changeCurrentFile({index, setCurrentFile})
        updateTextArea({textContent, fileContent, index})
    }
      const addedFiles = files.map( (val, index) => {
          let name = val;
          return(
              <FileButtons
                key={index}
                name={name}
                onButtonClick={() => handleMultiClick({textContent, fileContent, setCurrentFile, index})}
              />) 
          });
    return (
        <div>{addedFiles}</div>
    );
}



function Watch({textContent, files, setCurrentFile, fileContent}){
    //const [myFiles, setMyFiles] = useState([files])
    
    return(
        <div className='watchContainer'>
            <h1>Watched Folder</h1>
            <div className='fileList'>
                <FileList
                textContent={textContent}
                files={files}
                setCurrentFile={setCurrentFile}
                fileContent={fileContent}
                />
            </div>
        </div>
    );
}


export default Watch;