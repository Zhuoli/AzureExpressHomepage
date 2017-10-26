import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../main.html';
import '../cstock.html';

// this collection stores all the documents 
this.cstockDB = new Mongo.Collection("chinesestockmarket");

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('welcome', {
    to:"main"
  });
});

Router.route('/em', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('em', {
    to:"main"
  });
});


Router.route('/ustock', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('ustock', {
    to:"main"
  });
});

Router.route('/cstock', function () {
    this.render('navbar', {
    to:"navbar"
  });
  this.render('cstock', {
    to:"main"
  });
});
     

/// accounts config

Accounts.ui.config({
passwordSignupFields: "USERNAME_AND_EMAIL"
});

var samples = [
  {
    _id:"1",
    companyname:"jd",
    changePercent:"7",
    currentPrice:"5",
    price2EarningRatio:2.5,
    price2BookRatio:1.5,
    concepts:2.1,
    dateFirstIPO:"9-13-2008",
    lastUpdatedTime:"11-21-2017"
  },
    {
    _id:"6",
    companyname:"apple",
    changePercent:"7",
    currentPrice:"5",
    price2EarningRatio:2.5,
    price2BookRatio:1.5,
    concepts:2.1,
    dateFirstIPO:"9-13-2008",
    lastUpdatedTime:"11-21-2017"
  }
]

Template.cstock.helpers({
   stocks: function(){
    var cstocks = cstockDB.find({},{skip:0, limit: 500});
    console.log("Chinense stock size: " + cstocks.count());
    return cstocks;
    //return samples;
    } 
})



Template.body.helpers({username:function(){
if (Meteor.user()){
  return Meteor.user().username;
    //return Meteor.user().emails[0].address;
}
else {
  return "anonymous internet user";
}
}
});


/// Events
Template.navbar.events({
  'click .nav li'(event){
    $('li').removeClass('active');
    $(event.currentTarget).addClass('active');
  }
})

Template.cstock.events({
  "keyup #js-filter"(event){
     var rex = new RegExp($("#js-filter").val(), 'i');
      $('tbody tr').hide();
      $('tbody tr').filter(function () {
          return rex.test($(this).text());
      }).show();
  }
})

Template.cstock.onRendered(function(){
    console.log("onRendered called.");
    $("#myTable").tablesorter({
    theme : 'blue',
    // sort on the first column and second column in ascending order
    sortList: [[0,0],[1,0]],
    widgets : [ 'zebra', 'columns', "filter" ]
  });
})