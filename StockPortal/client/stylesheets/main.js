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
/// 
Template.cstock.helpers({
   stocks: function(){
    var cstocks = cstockDB.find();
    console.log("Chiense stock size: " + cstocks.count());
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
Template.navbar.Events({
  'click li a'(event){
    $('li').removeClass('active');
    $('this').addClass('active');
  }
})

