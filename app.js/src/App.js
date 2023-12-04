import './styles.css';
import Editor from './Editor'
import Watch from './Watch'
import Journal from './Journal'
import {useState, useRef} from 'react';

export default function App() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState();
  const [fileContent, setFileContent] = useState([]);
  const [fileChanges, setFileChanges] = useState(Array(10).fill([]))
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

