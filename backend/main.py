import os
import sys
import datetime
import logging
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

def line_diff(old_lines, new_lines):
        old_line_number = 1
        new_line_number = 1
        changes = ''
        while old_line_number <= len(old_lines) or new_line_number <= len(new_lines):
            if old_line_number > len(old_lines):
                changes += f'{datetime.datetime.now()}\t\t\t+\t\t\tl{new_line_number}:{new_lines[new_line_number-1].rstrip()}\n'
                new_line_number += 1
            elif new_line_number > len(new_lines):
                changes += f'{datetime.datetime.now()}\t\t\t-\t\t\tl{old_line_number}:{old_lines[old_line_number-1].rstrip()}\n'
                old_line_number += 1
            elif old_lines[old_line_number-1] != new_lines[new_line_number-1]:
                changes += f'{datetime.datetime.now()}\t\t\t-\t\t\tl{old_line_number}:{old_lines[old_line_number-1].rstrip()}\n'
                changes += f'{datetime.datetime.now()}\t\t\t+\t\t\tl{new_line_number}:{new_lines[new_line_number-1].rstrip()}\n'
                old_line_number += 1
                new_line_number += 1
            else:
                old_line_number += 1
                new_line_number += 1
        return changes

def circulate_journal(dat_filename, lines_to_delete):
    with open(dat_filename, 'r') as f:
        lines = f.readlines()

    lines = [lines[0]] + lines[lines_to_delete+1:]
    lines[0] = "Time Stamp\t\t\t\t\t\t\ta/r\t\t\tline\n"

    with open(dat_filename, 'w') as f:
        f.writelines(lines)


class FileChangeHandler (FileSystemEventHandler):
    def __init__(self):
        self.last_seen = {}

    def on_modified(self, event):
        try:
            if event.src_path.split(".")[-1] == "dat" or not os.path.isfile(event.src_path):
                return
            filename: str = event.src_path
            print(filename)
            dat_filename = '../watched_folder/' + filename.split('/')[-1] + '.dat'
            try:
                with open(filename, 'r') as f:
                    lines = f.readlines()
            except FileNotFoundError:
                print('File not found')
                return
            except IsADirectoryError:  
                print('Is a directory')
                return

            if filename in self.last_seen:
                old_lines = self.last_seen[filename]
                changes = line_diff(old_lines, lines)
                if changes:
                    try:
                        with open(dat_filename, 'a+') as f:
                            print(dat_filename)
                            f.seek(0)
                            if len(f.readlines()) > 50:
                                f.seek(0)
                                lines_to_delete = len(f.readlines()) - 50
                                lines_to_delete = lines_to_delete + len(changes.split('\n'))
                                print("lines to delete", lines_to_delete)
                                circulate_journal(dat_filename, lines_to_delete)
                            f.write(changes)
                    except Exception as e:
                        print(e)
                        pass

            self.last_seen[filename] = lines
        except Exception as e:
            print(e)
            pass

    def on_created(self, event):
        if event.src_path.split(".")[-1] == "dat":
            return
        filename = event.src_path
        dat_filename = '../watched_folder/' + filename.split('/')[-1] + '.dat'
        try:
            with open(filename, 'r') as f:
                lines = f.readlines()
        except (FileNotFoundError, IsADirectoryError, UnicodeDecodeError):
            print("error")
            return

        self.last_seen[filename] = lines

        with open(dat_filename, 'w') as f:
            f.write("Time Stamp\t\t\t\t\t\t\ta/r\t\t\tline\n")
            linenum = 1
            for line in lines:
                f.write(f'{datetime.datetime.now()}\t\t\t+\t\t\tl{linenum}:{line}')
                linenum += 1
        
    def on_deleted(self, event):
        if event.src_path.split(".")[-1] == "dat":
            return
        filename = event.src_path
        dat_filename = '../watched_folder/' + filename.split('/')[-1] + '.dat'
        
        if filename in self.last_seen:
            lines = self.last_seen[filename]
            linenum = 1
            with open(dat_filename, 'a') as f:
                for line in lines:
                    f.write(f'{datetime.datetime.now()}\t\t\t-\t\t\tl{linenum}:{line}')
                    linenum += 1
        else:
            print('File not found in last_seen')

if __name__ == "__main__":
    event_handler = FileChangeHandler()

    path = "../watched_folder"

    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    try:
        print("Monitoring")
        while True:
            time.sleep(1)
    finally:
        observer.stop()
        print("Done")
        observer.join()