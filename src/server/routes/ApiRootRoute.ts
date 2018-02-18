import { Router, Request, Response, NextFunction } from "express";
import * as path from 'path';

import Config from "../../configuration/Config";
//possible de remplacer le require ?
const config: Config = require(path.join(__dirname, '../../../config.json'));

export default class ApiRootRoute {
    router: Router;
    path: string;

    constructor() {
        this.router = Router();
        this.router.get("/", this.hello);
      }

      public hello = (req: Request, res: Response, next: NextFunction) => {
        let apiDesc = {
          "description" : "API entry point",
          "links":[
              { 
                  "rel": "self", 
                  "method": "GET", 
                  "href": config.serverHost + ":" + config.serverPort + config.serverApiRoot
              },
              { 
                  "rel": "ohlcgraph", 
                  "method": "GET", 
                  "href": config.serverHost + ":" + config.serverPort + config.serverApiOhlcgraph
              }
          ]
        };
        res.json(apiDesc);
      }
    
}


