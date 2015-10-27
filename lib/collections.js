Cards = new Mongo.Collection('cards');
Sets = new Mongo.Collection('sets');
Blocks = new Mongo.Collection('blocks');

Meteor.startup(function(){
  if (Meteor.isServer) {
    Cards._ensureIndex({ _id: 1, name: 1, rarity: 1, cmc: 1 });
  }
});

