import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

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

Template.cstock.helpers({
   stocks: function(){

    if(Meteor.user()){
        Meteor.subscribe("messages");
        console.log("User logged in, subscribed!");
    }else{
      console.log("User not logged in, no subscription");
    }
    var cstocks = ChineseStockMarket.find({},{skip:0, limit: 50});
    console.log("Chinense stock size: " + cstocks.count());
    return cstocks;
    //return samples;
    },

    retrieveUserNotification: function(){
      console.log("retrieveUserNotification...");
      if(!Meteor.userId()){
        return "You need log in first";
      }else{
        return "You logged in but has Nothing  " + Meteor.userId();
      }
    },

    retrieveWenCai: function(id){
          return "http://www.iwencai.com/stockpick/search?typed=1&preParams=&ts=1&f=1&qs=index_rewrite&selfsectsn=&querytype=&searchfilter=&tid=stockpick&w=" + id.substring(2);
    },

    retrieveTrend: function(id){
      return "http://stockpage.10jqka.com.cn/" + id;
    },

    retrieveColor: function(perctange){
      if(perctange.startsWith("+")){
        return "color:red;";
      }else{
        return "color:green;";
      }
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