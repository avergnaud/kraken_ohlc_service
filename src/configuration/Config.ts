export default interface Config
{
    exchange: string
    ohlcApiURL: string
    tradingPair: string
    interval: number 
    mongoUrl: string 
    mongoDbName: string
    mongoCollectionName: string
    settings: string[]
}