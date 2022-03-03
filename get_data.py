from flask import Flask, request, redirect, url_for, render_template
import csv

app = Flask(__name__, template_folder="./")

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'GET':
        return render_template("./radiologist_page.html")
    if request.method == 'POST':
        # check request data
        #print(request.json)
        im = request.json['imageName']
        vertices = request.json['coordinates']
        row = [im, vertices]

        # open file in append mode
        f = open('data/annotations.csv', 'a')
        # create csv writer
        writer = csv.writer(f)
        # write a row to the csv file
        writer.writerow(row)
        # if user goes back to previous image and marks again, both previous and new annotations are saved
    return ''

if __name__ == '__main__':
    #app.run(host='0.0.0.0')
    app.run(host = "localhost", port = 8000, debug = True)