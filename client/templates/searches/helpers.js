let blocks, sets;

blocks = Blocks.find({}, { $fields: ['_id', 'name'] });
sets = Sets.find({}, { $fields: ['_id', 'name'] });

Template.SearchIndex.helpers({
  blockList(){
    return blocks;
  },

  setList(){
    return sets;
  }
});

Template.SearchIndex.events({
  'submit #search'(e){
    e.preventDefault();
    Router.go('search.show', { query: $(e.target).serialize() }, { query: $(e.target).serialize() });
  }
});

