'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var mongoClient = require('mongodb').MongoClient
    var url = "mongodb://stockdbzhuoli:QrLUUzcspLOK2pjdEvVlevms5zCfvhQlChWOtrLVRI1r5HF1mKwAKwwFm296SBSWLoOPnAQ8apN8zaPPYA3inQ==@stockdbzhuoli.documents.azure.com:10255/stockdb?ssl=true&replicaSet=globaldb";

    var cstockArr = []
    mongoClient.connect(url, function(err, db) {
        if (err) throw err
        //create collection
        //db.createCollection("usstockcompany", function (err, collection) {
        //    if (err) throw err;

        //    console.log("Created testCollection");
        //    console.log(collection);
        //});

        var result = db.collection('usstockcompany').find();
        result.each(function (err, doc) {
            console.log('Exists: ', doc.length > 0);
            console.log("Found one item!");
            console.log(doc);
            console.log(err);
            cstockArr.push(doc); //Push result onto results_array
        })
        db.close();
    })
    res.render('cstock', { title: 'Cstock', stocks: cstockArr });
});

module.exports = router;
