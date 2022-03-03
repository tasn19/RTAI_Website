import json
import annotation_handler as an

from flask import Flask, request, redirect, url_for, render_template
import csv

app = Flask(__name__, template_folder="./")


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'GET':
        return render_template("./radiologist_page.html")
    if request.method == 'POST':
        # check request data
        # print(request.json)
        im = request.json['imageName']
        vertices = request.json['coordinates']

        an.update_row(im, json.dumps(vertices))
    return ''


@app.route('/annotations', methods=['POST'])
def get_annotations():
    print("called")
    im = request.json['imageName']
    vertices = an.get_row(im)
    return json.dumps(json.loads(vertices))


if __name__ == '__main__':
    # app.run(host='0.0.0.0')
    app.run(host="localhost", port=8000, debug=True)
