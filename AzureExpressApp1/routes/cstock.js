'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var mongoClient = require('mongodb').MongoClient

    mongoClient.connect("mongodb://stockdbzhuoli:QrLUUzcspLOK2pjdEvVlevms5zCfvhQlChWOtrLVRI1r5HF1mKwAKwwFm296SBSWLoOPnAQ8apN8zaPPYA3inQ==@stockdbzhuoli.documents.azure.com:10255/?ssl=true", function(err, db) {
        if (err) throw err
        db.collection('stockcompany').find().toArray(function(err, result) {
            if (err) throw err

            console.log(result)
        })
    })
    res.render('cstock', { title: 'Cstock', stocks : [] });
});

module.exports = router;
