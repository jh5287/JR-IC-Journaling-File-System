import os
import sys
import datetime
import logging
import difflib
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class FileChangeHandler (FileSystemEventHandler):
    def __init__(self):
        self.last_seen = {}

    def on_modified(self, event):
        if event.src_path.split(".")[-1] == "dat":
            return
        filename: str = event.src_path
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
            old_line_num = 1
            new_line_num = 1
            for line in difflib.ndiff(old_lines, lines):
                if line.startswith('- '):
                    change = f'{datetime.datetime.now()}\t\t\t-\t\t\tl{old_line_num}: {line[2:]}\n'
                    old_line_num += 1
                elif line.startswith('+ '):
                    change = f'{datetime.datetime.now()}\t\t\t+\t\t\tl{new_line_num}: {line[2:]}\n'
                    new_line_num += 1
                else:
                    old_line_num += 1
                    new_line_num += 1
                with open(dat_filename, 'a') as f:
                    f.write(change)

        self.last_seen[filename] = lines

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

        # Create the .dat file
        with open(dat_filename, 'w') as f:
            f.write("Time Stamp\t\t\t\t\t\t\ta/r\t\t\tline\n")
            for line in lines:
                f.write(f'{datetime.datetime.now()}\t\t\t+\t\t\t{line}')
        
    def on_deleted(self, event):
        if event.src_path.split(".")[-1] == "dat":
            return
        filename = event.src_path
        dat_filename = '../watched_folder/' + filename.split('/')[-1] + '.dat'
        
        if filename in self.last_seen:
            lines = self.last_seen[filename]
            with open(dat_filename, 'a') as f:
                for line in lines:
                    f.write(f'{datetime.datetime.now()}\t\t\tr\t\t\t{line}')
        else:
            print('File not found in last_seen')

def on_moved(event):
    print("moved")

if __name__ == "__main__":
    event_handler = FileChangeHandler()

    #calling functions
    event_handler.on_moved = on_moved

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