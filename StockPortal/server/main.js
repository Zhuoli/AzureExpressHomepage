import { Meteor } from 'meteor/meteor';


    var cstocks = ChineseStockMarket.find();
    console.log("Chiense stock size: " + cstocks.count());
Meteor.startup(() => {
  // code to run on server at startup
  // process.env.MONGO_URL='mongodb://stockmarketdbzhuoli:FMB5jJ6pGLwDlTzpJxCM6sD2gE7Y1UAFoQ7tWVpppTz5W9AXe0NnerY5GaRkfPMYZIa7xopJUeMaduHsOwVm6Q==@stockmarketdbzhuoli.documents.azure.com:10255/stockdb?ssl=true&replicaSet=globaldb'

});
