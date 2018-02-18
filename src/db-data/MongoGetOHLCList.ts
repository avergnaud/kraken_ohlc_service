import * as path from 'path';
import * as https from 'https';
import * as mongodb from 'mongodb';

import Config from "../configuration/Config";
//possible de remplacer le require ?
const config: Config = require(path.join(__dirname, '../../config.json'));

const MongoClient = mongodb.MongoClient;
const url = config.ohlcApiURL + "?pair=" + config.tradingPair + "&interval=" + config.interval;
const mongoUrl = config.mongoUrl;

let sinceParameter: string ="";

export default function getOHLCList(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {

        MongoClient.connect(mongoUrl, function(err, db) {
            let mongoDbName = db.db(config.mongoDbName);
            let options = {
              "sort": [['time','asc']]
            }
            mongoDbName.collection(config.mongoCollectionName).find({}, options).toArray(function(err, result) {
              if (err) {
                reject(err);
              } 
              // pas besoin des id mongo
              result.forEach(element => delete element._id);
              db.close();
              resolve(result);
            });
          });
    });
}
