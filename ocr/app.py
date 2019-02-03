from flask import Flask
from flask import request, jsonify

from script import parse_receipt
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/json-example', methods=['POST']) #GET requests will be blocked
def json_example():
#    return 'Todo...'
    req_data = request.get_json()
#    print(req_data)
    if len(req_data) != 3:
        return "Bad request!"
    x_offset = req_data['x']
    y_offset = req_data['y']
    url = req_data['url']
    return jsonify(parse_receipt(x_offset,y_offset,image_url=url))

if __name__ == "__main__":
    app.run(debug=True, port=5000) #run app in debug mode on port 5000
