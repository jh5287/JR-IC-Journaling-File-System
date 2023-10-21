import './styles.css';
import Editor from './Editor'

export default function App() {
  return (
    <div className="body">
    <div className="grid">

      <div className="watchedFolder">

      </div>

      <div className="textEditor">
        <Editor/>
      </div>

      <div className="journalFolder">

      </div>
    </div>
    </div>
  );
}

