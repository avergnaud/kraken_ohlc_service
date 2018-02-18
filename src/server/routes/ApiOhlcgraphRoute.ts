import { Router, Request, Response, NextFunction } from "express";
import * as path from 'path';
import getOHLCList from "../../db-data/MongoGetOHLCList";

import Config from "../../configuration/Config";
//possible de remplacer le require ?
const config: Config = require(path.join(__dirname, '../../../config.json'));

export default class ApiOhlcgraphRoute {
    router: Router;
    path: string;

    constructor() {
        this.router = Router();
        this.router.get("/", this.hello);
      }

      public hello = (req: Request, res: Response, next: NextFunction) => {
        let retour = {
            "description" : "ApiOhlcgraph",
            "type" : "OHLCGraph",
            "links":[
                { 
                    "rel": "self", 
                    "method": "GET", 
                    "href": config.serverHost + ":" + config.serverPort + config.serverApiOhlcgraph
                },
                { 
                    "rel": "module", 
                    "method": "GET", 
                    "href": "https://www.npmjs.com/package/avergnaud-ohlc"
                }
            ]
          };
        getOHLCList().then(function(returnedArray) {
            retour["ohlcgraph"] = JSON.stringify(returnedArray);
            // res.set('Content-Type', 'application/vnd.acme.user-v1+json');
            res.set('Content-Type','application/json')
            res.json(retour);
        })
        .catch(error => console.log(error));

      }
    
}


