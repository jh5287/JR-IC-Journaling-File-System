import './styles.css';
import Editor from './Editor'
import Watch from './Watch'

export default function App() {
  return (
    <div className="body">
    <div className="grid">

      <div className="watchedFolder">
        <Watch/>
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

