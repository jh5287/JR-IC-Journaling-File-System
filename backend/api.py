import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/newfile')
def newfile():
    filename = request.args.get('filename')
    with open(filename, 'w') as f:
        f.write('')
    return {'message': 'File created.'}

@app.route('/filechange')
def filechange():
    filename = request.args.get('filename')
    with open(filename, 'a') as f:
        f.write(request.args.get('change'))