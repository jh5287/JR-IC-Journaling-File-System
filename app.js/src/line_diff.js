const line_diff = (old_lines, new_lines) => {
    let old_line_number = 1;
    let new_line_number = 1;
    let changes = '';
    while (old_line_number <= old_lines.length || new_line_number <= new_lines.length) {
        if (old_line_number > old_lines.length) {
            changes += `${Date()}\t\t\t+\t\t\tl${new_line_number}:${new_lines[new_line_number-1]}`;
            new_line_number += 1;
        } else if (new_line_number > new_lines.length) {
            changes += `${Date()}\t\t\t-\t\t\tl${old_line_number}:${old_lines[old_line_number-1]}`;
            old_line_number += 1;
        } else if (old_lines[old_line_number-1] !== new_lines[new_line_number-1]) {
            changes += `${Date()}\t\t\t-\t\t\tl${old_line_number}:${old_lines[old_line_number-1]}`;
            changes += `${Date()}\t\t\t+\t\t\tl${new_line_number}:${new_lines[new_line_number-1]}`;
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