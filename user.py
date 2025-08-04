from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://namansrivastava1608:fxI2C833oZjW66s7@cluster0.ity4hgk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

@app.route("/customers", methods=["GET"])

def list_customers():
    try:
        print("🔌 Connecting to MongoDB...")
        client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        db = client['think41']
        users_collection = db['user']
        print(" Connection established")

        users = list(users_collection.find({}, {'_id': 0}).limit(10))
        print(f" Retrieved {len(users)} records")

        return jsonify({"customers": users, "count": len(users)})
    except Exception as e:
        print(" Error:", e)
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    print("🚀 Flask server running...")
    app.run(debug=True)
