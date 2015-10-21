Meteor.publish('Blocks', function(query = {}, options = { $fields: ['_id', 'name', 'sets'] }){
  return Blocks.find(query, options);
});

Meteor.publish('Cards', function(query = {}, options = {}){
  return Cards.find(query, options);
});

Meteor.publish('Sets', function(query = {}, options = { $fields: ['_id', 'name', 'blockId'] }){
  return Sets.find(query, options);
});
