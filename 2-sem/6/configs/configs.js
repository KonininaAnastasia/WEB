import {MongoClient} from "mongodb";

const URL = "mongodb://127.0.0.1:27017/db1";

let dbConnection;

export function connDB(cb){
    MongoClient.connect(URL).then((client) => {

            console.log('Connected to MongoDB');
            dbConnection = client.db();
            return cb();
            
        }).catch((err) => {
            return cb(err);
        });
}

export const getDb = () => dbConnection; //объект базы данных