import './styles.css';
import Editor from './Editor'
import Watch from './Watch'
import {useState, useEffect} from 'react';

export default function App() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState();
  useEffect (() => {

  }, [files]);

  return (
    <div className="body">
    <div className="grid">

      <div className="watchedFolder">
        <Watch
        files={files}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        />
      </div>

      <div className="textEditor">
        <Editor
        files={files}
        setFiles={setFiles}
        currentFile={currentFile}
        />
      </div>

      <div className="journalFolder">

      </div>
    </div>
    </div>
  );
}

