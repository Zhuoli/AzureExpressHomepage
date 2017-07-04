'use strict';
var express = require('express');
var router = express.Router();
var settings = require('../GlobalSettings')
var mongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function (req, res) {
    mongoClient.connect(process.env.MONGODB_URI || settings.defaultDB, function (err, db) {
        if (err) throw err
        var all = db.collection('usstockcompany').find();
        all.toArray(function (err, results) {
            if (err != null) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else {
                res.render('ustock', { title: 'Nasdaq Stock Dashboard', stocks: results });
            }
        });
    })
});

module.exports = router;
