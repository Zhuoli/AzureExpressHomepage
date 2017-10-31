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
      if(id.toLowerCase().startsWith('sh') || id.toLowerCase().startsWith('sz')){
        id=id.substring(2);
      }
      return "http://stockpage.10jqka.com.cn/" + id;
    },

    retrieveXueqiu: function(id){
      return "https://xueqiu.com/S/" + id;
    },

    retrieveColor: function(perctange){
      if(perctange > 0){
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
      Template.instance().pagination.filters({companyname: {$regex: $("#js-filter").val(), $options: 'i'}});
  },

  // Symbol sorting
  "click .symbol-desc"(event){
    $(event.currentTarget).removeClass('symbol-desc');
    $(event.currentTarget).addClass('symbol-asc');
    Template.instance().pagination.sort({_id:-1});
    console.log('you clicked symbol-desc: ' + JSON.stringify(Template.instance().pagination.sort()));
  },

  "click .symbol-asc"(event){
    $(event.currentTarget).removeClass('symbol-asc');
    $(event.currentTarget).addClass('symbol-desc');
    Template.instance().pagination.sort({_id:1});
    console.log('you clicked symbol-asc: ' + JSON.stringify(Template.instance().pagination.sort()));
  },

  // Change perctange sorting 
  "click .stock-quote-desc"(event){
    $(event.currentTarget).removeClass('stock-quote-desc');
    $(event.currentTarget).addClass('stock-quote-asc');
    Template.instance().pagination.sort({changePercent:-1});
    console.log('you clicked stock-quote-desc: ' + JSON.stringify(Template.instance().pagination.sort()));
  },

  "click .stock-quote-asc"(event){
    $(event.currentTarget).removeClass('stock-quote-asc');
    $(event.currentTarget).addClass('stock-quote-desc');
    Template.instance().pagination.sort({changePercent:1});
    console.log('you clicked stock-quote-asc ' + JSON.stringify(Template.instance().pagination.sort()));
  },

  // Last update date sorting 
  "click .sock-date-desc"(event){
    $(event.currentTarget).removeClass('sock-date-desc');
    $(event.currentTarget).addClass('sock-date-asc');
    Template.instance().pagination.sort({lastUpdatedTime:-1});
    console.log('you clicked sock-date-desc' + JSON.stringify(Template.instance().pagination.sort()));
  },

  "click .sock-date-asc"(event){
    $(event.currentTarget).removeClass('sock-date-asc');
    $(event.currentTarget).addClass('sock-date-desc');
    Template.instance().pagination.sort({lastUpdatedTime:1});
    console.log('you clicked symbol-date-asc' + JSON.stringify(Template.instance().pagination.sort()));
  },

  // IPO date sorting
    "click .stock-ipo-desc"(event){
    $(event.currentTarget).removeClass('stock-ipo-desc');
    $(event.currentTarget).addClass('stock-ipo-asc');
    Template.instance().pagination.sort({dateFirstIPO:-1});
    console.log('you clicked stock-ipo-desc' + JSON.stringify(Template.instance().pagination.sort()));
  },

  "click .stock-ipo-asc"(event){
    $(event.currentTarget).removeClass('stock-ipo-asc');
    $(event.currentTarget).addClass('stock-ipo-desc');
    Template.instance().pagination.sort({dateFirstIPO:1});
    console.log('you clicked stock-ipo-asc' + JSON.stringify(Template.instance().pagination.sort()));
  },
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


Template.cstock.onCreated(function () {
    this.pagination = new Meteor.Pagination(ChineseStockMarket, {
        sort: {
            _id: 1
        }
    });
    this.pagination.perPage(50);
});

Template.cstock.helpers({
    isReady: function () {
        return Template.instance().pagination.ready();
    },
    templatePagination: function () {
        return Template.instance().pagination;
    },
    documents: function () {
        return Template.instance().pagination.getPage();
    },
    // optional helper used to return a callback that should be executed before changing the page
    clickEvent: function() {
        return function(e, templateInstance, clickedPage) {
            e.preventDefault();
            console.log('Changing page from ', templateInstance.data.pagination.currentPage(), ' to ', clickedPage);
        };
    }
});