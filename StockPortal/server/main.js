import { Meteor } from 'meteor/meteor';

// this collection stores all the documents 
ChineseStockMarket = new Mongo.Collection("chinesestockmarket");
// this.cstockDB.insert(
// {
// 	    _id:"1",
//     companyname:"jd",
//     changePercent:"7",
//     currentPrice:"5",
//     price2EarningRatio:2.5,
//     price2BookRatio:1.5,
//     concepts:2.1,
//     dateFirstIPO:"9-13-2008",
//     lastUpdatedTime:"11-21-2017"
//   }
//  )
    var cstocks = ChineseStockMarket.find();
    console.log("Chiense stock size: " + cstocks.count());
Meteor.startup(() => {
  // code to run on server at startup
  // process.env.MONGO_URL='mongodb://stockmarketdbzhuoli:FMB5jJ6pGLwDlTzpJxCM6sD2gE7Y1UAFoQ7tWVpppTz5W9AXe0NnerY5GaRkfPMYZIa7xopJUeMaduHsOwVm6Q==@stockmarketdbzhuoli.documents.azure.com:10255/stockdb?ssl=true&replicaSet=globaldb'

});
