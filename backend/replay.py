import os
from datetime import datetime

def replay(filename, line_count):
    file_state = {}
    line_count += 1
    with open(f'{filename}.dat', 'r') as f:
        for i, line in enumerate(f.readlines()):
            if i == 0:
                continue
            if i >= line_count:
                break
            time, operation, content = line.split('\t\t\t', 2)
            line_number, line_content = content.split(':', 1)
            line_number = int(line_number[1:])
            if operation == '+':
                file_state[line_number] = line_content
            elif operation == '-':
                if line_number in file_state:
                    del file_state[line_number]
    with open(filename, 'w') as f:
        for line_number in sorted(file_state.keys()):
            f.write(file_state[line_number])

replay('../watched_folder/new.txt', 6)