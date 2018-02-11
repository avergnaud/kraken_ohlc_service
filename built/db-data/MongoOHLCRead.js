"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const mongodb = require("mongodb");
//possible de remplacer le require ?
const config = require(path.join(__dirname, '../../config.json'));
const MongoClient = mongodb.MongoClient;
const url = config.ohlcApiURL + "?pair=" + config.tradingPair + "&interval=" + config.interval;
const mongoUrl = config.mongoUrl;
let sinceParameter = "";
function getApiRequestUrl() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, function (err, db) {
            let mongoDbName = db.db(config.mongoDbName);
            let options = {
                "limit": 1,
                "sort": [['time', 'desc']]
            };
            mongoDbName.collection(config.mongoCollectionName).find({}, options).toArray(function (err, result) {
                if (err) {
                    reject(err);
                }
                if (result.length != 0 && result[0] != null && result[0].time != null) {
                    sinceParameter = "&since=" + result[0].time;
                }
                db.close();
                resolve(url + sinceParameter);
            });
        });
    });
}
exports.default = getApiRequestUrl;
