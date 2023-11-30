import os
from datetime import datetime

def replay(filename):

    with open(f'{filename}.dat', 'r') as f:
        journal = f.readlines()

    print('What timestamp would you like to replay to?\n')
    linenum = 1
    for line in journal:
        print(f'{linenum}: {line}\n')
        linenum += 1
    user_input: int = input('Enter the number of the line you would like to replay to: ')
    while True:
        try:
            user_input = int(user_input)
            break
        except ValueError:
            user_input = input('Please enter a valid number: ')

replay('../watched_folder/test.txt')