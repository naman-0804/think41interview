from pymongo import MongoClient

uri = "mongodb+srv://namansrivastava1608:fxI2C833oZjW66s7@cluster0.ity4hgk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)

db = client['think41']
users_collection = db['user']

print(list(users_collection.find().limit(1)))
