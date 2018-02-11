import * as path from 'path';
import * as https from 'https';
import * as mongodb from 'mongodb';
import OHLC from "avergnaud-ohlc";
import getApiRequestUrl from "./db-data/MongoOHLCRead";
import retrieveMarketData from "./exchange-data/HttpsGet";
import insertOHLC from "./db-data/MongoOHLCInsert";

import Config from "./configuration/Config";
//possible de remplacer le require ?
const config: Config = require(path.join(__dirname, '../config.json'));

const MongoClient = mongodb.MongoClient;
const url = config.ohlcApiURL + "?pair=" + config.tradingPair + "&interval=" + config.interval;
const mongoUrl = config.mongoUrl;

let sinceParameter: string ="";

/* etape 1 : récupération du max time en base */
getApiRequestUrl()
  .then(function(url) {
    console.log("calling " + url);
    return retrieveMarketData(url);
  })
  .then(function(body) {
    insertOHLC(body);
  })
  .catch(error => console.log(error));





