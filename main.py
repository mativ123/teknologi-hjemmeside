from flask import Flask, render_template, jsonify, request
import serial
import time
from threading import Thread

app = Flask(__name__)

glob = 0
glib = ""

def listen():
    global glob
    global glib
    with serial.Serial('/dev/ttyACM0', 9600, timeout=1) as ser:
        while True:
            try:
                num = ser.readline().decode().strip()
                print(num);
                glib = str(num)
                if num != '':
                    if float(num) < 0.2:
                        glob += 1
            except UnicodeDecodeError:
                pass

@app.route('/')
def home():
    return render_template('index.html', dinmor = glob)

@app.route('/statistik')
def about():
    return render_template('stats.html')

@app.route('/api/update')
def updateData():
    return jsonify({"num": glob, "alk": glib})

@app.route('/api/remove', methods = ['POST'])
def removeData():
    global glob
    print(request.json)
    if glob > 0:
        glob -= request.json['amount']
    return jsonify({'success': True})


if __name__ == '__main__':
    Thread(target=listen).start()
    app.run()

