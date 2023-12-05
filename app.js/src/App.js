import './styles.css';
import Editor from './Editor'
import Watch from './Watch'
import Journal from './Journal'
import {useState, useRef} from 'react';



//could I make the file state an object that holds all of the current state data I have
//instead of having all of these different states?

export default function App() {
  //files holds the names of the files in the watched folder
  const [files, setFiles] = useState([]);
  //currentFile holds the index of the current file being edited
  const [currentFile, setCurrentFile] = useState();
  //fileContent holds the current content of each file up to ten files
  const [fileContent, setFileContent] = useState([]);
  //fileChanges holds the changes made to each file up to ten files
  const [fileChanges, setFileChanges] = useState(Array(10).fill([]))
  //textContent holds the current text in the text area
  const textContent = useRef(null);


  return (
    <div className="body">
    <div className="grid">

      <div className="watchedFolder">
        <Watch
        textContent={textContent}
        files={files}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        fileContent={fileContent}
        />
      </div>

      <div className="textEditor">
        <Editor
        textContent={textContent}
        files={files}
        setFiles={setFiles}
        currentFile={currentFile}
        fileContent={fileContent}
        setFileContent={setFileContent}
        fileChanges={fileChanges}
        setFileChanges={setFileChanges}
        />
      </div>

      <div className="journalFolder">
        <Journal
        files={files}
        currentFile={currentFile}
        fileChanges={fileChanges}
        setFileChanges={setFileChanges}
        />
      </div>
    </div>
    </div>
  );
}

