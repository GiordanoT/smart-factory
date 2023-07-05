from flask import Flask, json, request
from components.Planner import Planner
from info.Url import Url

app = Flask(__name__)


@app.route('/planner', methods=['POST'])
def index():
    symptoms = request.json
    planner = Planner(symptoms)
    planner.execute()
    return json.dumps({})


app.run(debug=False, host=Url.planner, port=5001)
