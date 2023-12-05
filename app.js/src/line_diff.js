const line_diff = (old_lines, new_lines) => {
    let old_line_number = 1;
    let new_line_number = 1;
    let changes = '';
    if (typeof old_lines === 'string' && typeof new_lines === 'string'){
        old_lines += '\n';
        new_lines += '\n';
    }
    console.log("old lines before split", old_lines)
    console.log("new lines before split", new_lines)
    old_lines = old_lines.split('\n');
    new_lines = new_lines.split('\n');
    console.log("old lines after split", old_lines)
    console.log("new lines after split", new_lines)
    old_lines.pop();
    new_lines.pop();
    while (old_line_number <= old_lines.length || new_line_number <= new_lines.length) {
        if (old_line_number > old_lines.length) {
            changes += `${Date()}           +           l${new_line_number}:${new_lines[new_line_number-1]}
            `;
            new_line_number += 1;
        } else if (new_line_number > new_lines.length) {
            changes += `${Date()}           -           l${old_line_number}:${old_lines[old_line_number-1]}
            `;
            old_line_number += 1;
        } else if (old_lines[old_line_number-1] !== new_lines[new_line_number-1]) {
            changes += `${Date()}           -           l${old_line_number}:${old_lines[old_line_number-1]}
            `;
            changes += `${Date()}           +           l${new_line_number}:${new_lines[new_line_number-1]}
            `;
            old_line_number += 1;
            new_line_number += 1;
        } else {
            old_line_number += 1;
            new_line_number += 1;
        }
    }
    return changes;
}


export default line_diff