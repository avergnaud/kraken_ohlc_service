"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const mongodb = require("mongodb");
//possible de remplacer le require ?
const config = require(path.join(__dirname, "../../config.json"));
const MongoClient = mongodb.MongoClient;
const url = config.ohlcApiURL +
    "?pair=" +
    config.tradingPair +
    "&interval=" +
    config.interval;
const mongoUrl = config.mongoUrl;
let sinceParameter = "";
function insertOHLC(body) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) {
                reject(err);
            }
            let mongoDbName = db.db(config.mongoDbName);
            for (const arrValue of body.result.XETHZEUR) {
                let ohlc = mapKrakenTableElementToMongoDocument(arrValue);
                mongoDbName
                    .collection(config.mongoCollectionName)
                    .update({ time: ohlc.time }, ohlc, { upsert: true }, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                });
                // mongoDbName.collection(config.mongoCollectionName).insertOne(ohlc, function(err, res) {
                //   if (err) {
                //     console.log(err);
                //   }
                // });
            }
            db.close();
            resolve(true);
        });
    });
}
exports.default = insertOHLC;
function mapKrakenTableElementToMongoDocument(krakenTableElement) {
    let ohlc = {
        exchange: config.exchange,
        currencyPair: config.tradingPair,
        interval: config.interval,
        time: krakenTableElement[0],
        open: krakenTableElement[1],
        high: krakenTableElement[2],
        low: krakenTableElement[3],
        close: krakenTableElement[4],
        vwap: krakenTableElement[5],
        volume: krakenTableElement[6],
        count: krakenTableElement[7]
    };
    return ohlc;
}
