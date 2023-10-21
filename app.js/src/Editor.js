import './styles.css';

function Button({value, onButtonClick}){
    return (
        <button className="button" onClick={onButtonClick}>
            {value}
        </button>
    )
}

export default function Editor(){
    function handleClick(value) {
        return console.log(value)
    }
    return (
         <div className="editorContainer">
            <h1>Text Editor</h1>
            <div className="textSpace">Hello World!</div>
            <footer>
                <Button value={'Save'} onButtonClick={() => handleClick('Save')}/>
                <Button value={'New'} onButtonClick={() => handleClick('New')}/>
                <Button value={'Delete'} onButtonClick={() => handleClick('Delete')}/>
                <Button value={'Recover'} onButtonClick={() => handleClick('Recover')}/>
            </footer>
         </div>


    );
}