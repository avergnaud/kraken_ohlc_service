import * as path from "path";
import * as https from "https";
import * as mongodb from "mongodb";
import OHLC from "avergnaud-ohlc";

import Config from "../configuration/Config";
//possible de remplacer le require ?
const config: Config = require(path.join(__dirname, "../../config.json"));

const MongoClient = mongodb.MongoClient;
const url =
  config.ohlcApiURL +
  "?pair=" +
  config.tradingPair +
  "&interval=" +
  config.interval;
const mongoUrl = config.mongoUrl;

let sinceParameter: string = "";

export default function insertOHLC(body): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    MongoClient.connect(mongoUrl, function(err, db) {
      if (err) {
        reject(err);
      }
      let mongoDbName = db.db(config.mongoDbName);
      for (const arrValue of body.result.XETHZEUR) {
        let ohlc: OHLC = mapKrakenTableElementToMongoDocument(arrValue);

        mongoDbName
          .collection(config.mongoCollectionName)
          .update({ time: ohlc.time }, ohlc, { upsert: true }, function(err, result) {
            if (err) {
              console.log(err);
            }
          });
      }
      db.close();
      resolve(true);
    });
  });
}

function mapKrakenTableElementToMongoDocument(krakenTableElement): OHLC {
  let ohlc: OHLC = {
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
