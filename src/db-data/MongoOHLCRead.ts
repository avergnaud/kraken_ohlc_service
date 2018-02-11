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

export default function getApiRequestUrl(): Promise<string> {
    return new Promise<string>((resolve, reject) => {

        MongoClient.connect(mongoUrl, function(err, db) {
            let mongoDbName = db.db(config.mongoDbName);
            let options = {
              "limit": 1,
              "sort": [['time','desc']]
            }
            mongoDbName.collection(config.mongoCollectionName).find({}, options).toArray(function(err, result) {
              if (err) {
                reject(err);
              } 
              if(result.length != 0 && result[0] != null && result[0].time != null) {
                sinceParameter = "&since=" + result[0].time;
              }
              db.close();
              resolve(url + sinceParameter);
            });
          });
    });
}

