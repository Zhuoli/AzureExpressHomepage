var require = meteorInstall({"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// server/main.js                                                                    //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
var Meteor = void 0;                                                                 // 1
module.watch(require("meteor/meteor"), {                                             // 1
  Meteor: function (v) {                                                             // 1
    Meteor = v;                                                                      // 1
  }                                                                                  // 1
}, 0);                                                                               // 1
// this collection stores all the documents                                          // 3
this.cstockDB = new Mongo.Collection("chinesestockmarket"); // this.cstockDB.insert(
// {                                                                                 // 6
// 	    _id:"1",                                                                     // 7
//     companyname:"jd",                                                             // 8
//     changePercent:"7",                                                            // 9
//     currentPrice:"5",                                                             // 10
//     price2EarningRatio:2.5,                                                       // 11
//     price2BookRatio:1.5,                                                          // 12
//     concepts:2.1,                                                                 // 13
//     dateFirstIPO:"9-13-2008",                                                     // 14
//     lastUpdatedTime:"11-21-2017"                                                  // 15
//   }                                                                               // 16
//  )                                                                                // 17
                                                                                     //
var cstocks = this.cstockDB.find();                                                  // 18
console.log("Chiense stock size: " + cstocks.count());                               // 19
Meteor.startup(function () {                                                         // 20
  // code to run on server at startup                                                // 21
  process.env.MONGO_URL = 'mongodb://stockmarketdbzhuoli:FMB5jJ6pGLwDlTzpJxCM6sD2gE7Y1UAFoQ7tWVpppTz5W9AXe0NnerY5GaRkfPMYZIa7xopJUeMaduHsOwVm6Q==@stockmarketdbzhuoli.documents.azure.com:10255/stockdb?ssl=true&replicaSet=globaldb';
});                                                                                  // 24
///////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./server/main.js");
//# sourceMappingURL=app.js.map
