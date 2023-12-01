const fs = require('fs');
const path = require('path');

function replay(filename, lineCount) {
    let fileState = {};
    lineCount += 1;
    let data = fs.readFileSync(`${filename}.dat`, 'utf-8');
    let lines = data.split('\n');
    for (let i = 1; i < lines.length; i++) {
        if (i >= lineCount) {
            break;
        }
        let [time, operation, content] = lines[i].split('\t\t\t', 3);
        let [lineNumber, lineContent] = content.split(':', 2);
        lineNumber = parseInt(lineNumber.substring(1));
        if (operation === '+') {
            fileState[lineNumber] = lineContent;
        } else if (operation === '-') {
            if (lineNumber in fileState) {
                delete fileState[lineNumber];
            }
        }
    }
    let sortedKeys = Object.keys(fileState).sort((a, b) => a - b);
    let result = '';
    for (let key of sortedKeys) {
        result += fileState[key] + '\n';
    }
    fs.writeFileSync(filename, result, 'utf-8');
}