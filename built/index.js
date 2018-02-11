"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const mongodb = require("mongodb");
const MongoOHLCRead_1 = require("./db-data/MongoOHLCRead");
const HttpsGet_1 = require("./exchange-data/HttpsGet");
const MongoOHLCInsert_1 = require("./db-data/MongoOHLCInsert");
//possible de remplacer le require ?
const config = require(path.join(__dirname, '../config.json'));
const MongoClient = mongodb.MongoClient;
const url = config.ohlcApiURL + "?pair=" + config.tradingPair + "&interval=" + config.interval;
const mongoUrl = config.mongoUrl;
let sinceParameter = "";
/* etape 1 : récupération du max time en base */
MongoOHLCRead_1.default()
    .then(function (url) {
    console.log("calling " + url);
    return HttpsGet_1.default(url);
})
    .then(function (body) {
    MongoOHLCInsert_1.default(body);
})
    .catch(error => console.log(error));
