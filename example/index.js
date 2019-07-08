let DataAdapter = require('../src/index');
let data = new DataAdapter({
    a: {
        b: {
            c: 1,
            f: 6
        },
        e: 5
    },
    d: 4
}, 'kong');
console.log(data.get("a"))//{ b: { c: 1, f: 6 }, e: 5 }
console.log(data.get("a.b"))//{ c: 1, f: 6 }
console.log(data.get('b.a'))//kong
console.log(data.get('a.b.f'))//6
console.log(data.get('a.b.f.g'))//kong
let v1 = DataAdapter.source({
    a: {
        b: {
            c: 1,
            f: 6
        },
        e: 5
    },
    d: 4
}, 'kong').get('a');

let v2 = DataAdapter.source([{ a: 1, b: 1, c: 1 }, { a: 1, b: 2, c: 2 }]).get('a=1&&b=2');
console.log(v2);//[ { a: 1, b: 2, c: 2 } ]

let v3 = DataAdapter.source({
    a: {
        b: {
            c: 1,
            f: 6,
            g: [{
                h: 7,
                i: [
                    { j: 1 }
                ]
            }]
        },
        e: 5
    },
    d: 4
});
v3.assign({ c: 2, e: 3, d: 5, h: 8, j: 2 }, 'a.b.g.0.i.0')
console.log(JSON.stringify(v3.data))//{"a":{"b":{"c":2,"f":6,"g":[{"h":8,"i":[{"j":2}]}]},"e":3},"d":5}

let json = { "instrument": "FXSPOT", "pair": "EURGBP", "spotNoDecimal": 3, "fwdNoDecimal": 2, "pointsDigit": 2, "rateEnlargeNum": 2, "swapNoDecimal": 2, "currency1": "EUR", "currency1NoDecimal": "4", "currency2": "GBP", "currency2NoDecimal": "3", "priceType": "BP", "valueDate": "2018-02-01", "tenors": "SP", "qtyList": [{ "qtyLevel": 100000, "bestBid": 7.994846, "bestAsk": 5.837938, "bestBidChannel": "channel_0001", "bestAskChannel": "CITI_Stream", "priceList": [{ "eic": "adfas", "quoteId": "1231", "channel": "channel_0001", "bid": "1.006", "ask": "1.304", "mid": 1.5674, "valueDate": "2018-02-01", "minBidAmt": 1000, "maxBidAmt": 100000, "minAskAmt": 1000, "maxAskAmt": 100000, "priceState": "0", "channelName": "渠道1", "bigBid": { "ph": "1.", "pm": "00", "pf": "6" }, "bigAsk": { "ph": "1.", "pm": "30", "pf": "4" }, "spread": "29.80", "isBestBid": true, "isBestAsk": false }, { "eic": "adfasd", "quoteId": "test_quote_id_0012", "channel": "channel_0001", "bid": "2.222", "ask": "2.333", "mid": 2.5674, "valueDate": "2018-02-01", "minBidAmt": 1000, "maxBidAmt": 100000, "minAskAmt": 1000, "maxAskAmt": 100000, "priceState": 0, "channelName": "渠道1", "bigBid": { "ph": "2.", "pm": "22", "pf": "2" }, "bigAsk": { "ph": "2.", "pm": "33", "pf": "3" }, "spread": "11.10", "isBestBid": true, "isBestAsk": false }], "bigBid": { "ph": "7.", "pm": "99", "pf": "5" }, "bigAsk": { "ph": "5.", "pm": "83", "pf": "8" }, "bid": "7.995", "ask": "5.838", "spread": "215.7", "bestAskChannelName": "花旗牌价流", "bestBidChannelName": "渠道1" }], "isSingle": false, "bestBidChannelName": "渠道1", "bestAskChannelName": "花旗牌价流", "currentLeval": { "qtyLevel": 100000, "bestBid": 7.994846, "bestAsk": 5.837938, "bestBidChannel": "channel_0001", "bestAskChannel": "CITI_Stream", "priceList": [{ "eic": "adfas", "quoteId": "1231", "channel": "channel_0001", "bid": "1.006", "ask": "1.304", "mid": 1.5674, "valueDate": "2018-02-01", "minBidAmt": 1000, "maxBidAmt": 100000, "minAskAmt": 1000, "maxAskAmt": 100000, "priceState": "0", "channelName": "渠道1", "bigBid": { "ph": "1.", "pm": "00", "pf": "6" }, "bigAsk": { "ph": "1.", "pm": "30", "pf": "4" }, "spread": "29.80", "isBestBid": true, "isBestAsk": false }, { "eic": "adfasd", "quoteId": "test_quote_id_0012", "channel": "channel_0001", "bid": "2.222", "ask": "2.333", "mid": 2.5674, "valueDate": "2018-02-01", "minBidAmt": 1000, "maxBidAmt": 100000, "minAskAmt": 1000, "maxAskAmt": 100000, "priceState": 0, "channelName": "渠道1", "bigBid": { "ph": "2.", "pm": "22", "pf": "2" }, "bigAsk": { "ph": "2.", "pm": "33", "pf": "3" }, "spread": "11.10", "isBestBid": true, "isBestAsk": false }], "bigBid": { "ph": "7.", "pm": "99", "pf": "5" }, "bigAsk": { "ph": "5.", "pm": "83", "pf": "8" }, "bid": "7.995", "ask": "5.838", "spread": "215.7", "bestAskChannelName": "花旗牌价流", "bestBidChannelName": "渠道1" }, "levelString": 100000, "bidModify": 1000000 }
let target = { "ask": 0.844014, "bestAsk": 2.457441, "bestAskChannel": "CITI_Stream", "bestBid": 4.180342, "bestBidChannel": "channel_0001", "bid": 4.443151, "channel": "channel_0001", "currency1": "EUR", "currency1NoDecimal": "4", "currency2": "GBP", "currency2NoDecimal": "3", "eic": "adfas", "fwdNoDecimal": 2, "instrument": "FXSPOT", "pair": "EURGBP", "pointsDigit": 2, "qtyLevel": 100000, "quoteId": "1231", "rateEnlargeNum": 2, "spotNoDecimal": 3, "swapNoDecimal": 2 }
let v4 = DataAdapter.source(json);
v4.assign(target, "qtyList.0.priceList.0");
console.log(v4.data)
//深合并
console.log('******************************************')
let res = v3.merge({
    a: {
        b: {
            c: 4
        },
        e: 4
    },
    d:11
})
console.log(JSON.stringify(res))//{"a":{"b":{"c":4,"f":6,"g":[{"h":8,"i":[{"j":2}]}]},"e":4},"d":11}
let res2 = v3.merge({
    a: {
        b: {
            c: 4
        },
        e: 4
    },
    d:11
},false)
console.log(JSON.stringify(res2))//{"a":{"b":{"c":4},"e":4},"d":11}