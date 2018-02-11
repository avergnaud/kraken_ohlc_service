# TODO

https://api.kraken.com/0/public/OHLC?pair=XETHZEUR&interval=1440&since=1517443200

kraken_ohlc_db

# Instal

db.createCollection("OHLC")

db.OHLC.ensureIndex({exchange:1})
db.OHLC.ensureIndex({currencyPair:1})
db.OHLC.ensureIndex({interval:1})
db.OHLC.ensureIndex({time:1})

# compile

tsc

# run 

node build/index.js

# test

db.OHLC.remove({})

db.OHLC.find().sort({"time":1})

db.OHLC.find().sort({time:-1}).limit(1)

# migration js ts

tsconfig.json

npm install @types/mongodb --save

# server

cf :
https://gitlab.com/avergnaud/crypto-trading-bots-back
ou
https://github.com/avergnaud/slack-bot