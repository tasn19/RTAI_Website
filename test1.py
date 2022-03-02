from flask import Flask, request, redirect, url_for, render_template

app = Flask(__name__, template_folder="./")

# create csv
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'GET':
        # return render_template("./test.html")
        return render_template("./radiologist_page.html")
    if request.method == 'POST':
        # check if the post request has the file part
        print(request.json)

        #save


    return 'yayyy'

if __name__ == '__main__':
    #app.run(host='0.0.0.0')
    app.run(host = "localhost", port = 8000, debug = True)