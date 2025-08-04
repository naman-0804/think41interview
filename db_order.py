import csv
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://namansrivastava1608:fxI2C833oZjW66s7@cluster0.ity4hgk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

data="think41"
collec="orders"
CSV_FILE="orders.csv"
def load_data():
    client=pymongo.MongoClient(uri)
    db=client[data]
    collection=db[collec]
    csvinsert=[]
    with open(CSV_FILE,'r',encoding='utf-8') as file:
        reader=csv.DictReader(file)
        for row in reader:
            try:
                csvinsert.append(row)
            except ValueError as e:
                print(f"Error in data types") #only if i convert
        if csvinsert:
            collection.insert_many(csvinsert)
        else:
            print("No data to insert")

if __name__=="__main__":
    load_data()