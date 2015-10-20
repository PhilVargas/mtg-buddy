Router.route('/', function(){
  this.render('SearchIndex', {
    data(){
      return {
        blockList: Blocks.find({}, { $fields: ['_id', 'name', 'sets'] })
      };
    }
  });
}, {
  name: 'search.index',
  subscriptions(){
    return [Meteor.subscribe('Blocks')];
  }
});

Router.route('/search', function(){
  let query, params;

  params = this.params.query;
  query = { $and: [] };

  if (params.name) {
    query.$and.push({ name: { $regex: params.name, $options: 'i' } });
  }

  if (params.rarity) {
    query.$and.push({ rarity: params.rarity });
  }

  if (params.set) {
    query.$and.push({ $or: [{ setId: params.set }, { blockId: params.set }] });
  }

  this.render('SearchShow', {
    data(){
      return { results: Cards.find(query).fetch() };
    }
  });
}, {
  name: 'search.show',
  subscriptions(){
    return Meteor.subscribe('Cards');
  }
});

Router.route('/cards/:_id', {
  name: 'card.show',
  loadingTemplate: 'loading',
  action(){
    this.render('CardShow', {
      data(){
        return {
          displayCard: Cards.findOne({ _id: this.params._id }),
          displaySet: Sets.findOne(),
          displayBlock: Blocks.findOne()
        };
      }
    });
  },
  subscriptions(){
    return [
      Meteor.subscribe('Cards', { _id: this.params._id }),
      Meteor.subscribe('Blocks', { cardIds: { $elemMatch: { $eq: this.params._id } } }, { $fields: ['name'] }),
      Meteor.subscribe('Sets', { cardIds: { $elemMatch: { $eq: this.params._id } } }, { $fields: ['name'] })
    ];
  }
});
