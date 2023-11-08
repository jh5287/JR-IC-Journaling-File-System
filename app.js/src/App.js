import './styles.css';
import Editor from './Editor'
import Watch from './Watch'
import {useState} from 'react';

export default function App() {
  const [files, setFiles] = useState([]);
  return (
    <div className="body">
    <div className="grid">

      <div className="watchedFolder">
        <Watch
        txtFiles={files}
        />
      </div>

      <div className="textEditor">
        <Editor
        txtFiles={files}
        setTxtFiles={setFiles}
        />
      </div>

      <div className="journalFolder">

      </div>
    </div>
    </div>
  );
}

