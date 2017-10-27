import { publishPagination } from 'meteor/kurounin:pagination';

publishPagination(ChineseStockMarket);


// public sets of editing users
Meteor.publish("messages", function(){
    if(this.userId){
    	return ChineseStockMarket.find({});
    }else{
    	return undefined;
    }
})
