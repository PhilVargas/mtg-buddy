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
  query = { $and: [ { multiverseid: { $exists: true } } ] };

  if (params.name) {
    query.$and.push({ name: { $regex: params.name, $options: 'i' } });
  }

  if (params.rarity) {
    query.$and.push({ rarity: params.rarity });
  }

  if (params.types) {
    query.$and.push({ types: params.types });
  }

  if (params.set) {
    query.$and.push({ $or: [{ setId: params.set }, { blockId: params.set }] });
  }

  if (params.minPower !== '') {
    query.$and.push({ power: { $lte: +params.minPower } });
  }

  if (params.maxPower !== '') {
    query.$and.push({ power: { $gte: +params.maxPower } });
  }

  if (params['fuzzy-type']) {
    query.$and.push({
      $or: [
        { supertypes: { $regex: params['fuzzy-type'], $options: 'i' } },
        { subtypes: { $regex: params['fuzzy-type'], $options: 'i' } }
      ]
    });
  }

  if (params.colors) {
    query.$and.push({
      $or: params.colors.map((color) => {
        return color.split('-');
      }).map((colorSelectors) => {
        return { colors: { $all: [colorSelectors] } };
      })
    });
  }

  this.render('SearchShow', {
    data(){
      return { results: Cards.find(query, { sort: { name: 1 } }).fetch() };
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
          displaySet: Sets.findOne({ cardIds: this.params._id }),
          displayBlock: Blocks.findOne({ cardIds: this.params_id })
        };
      }
    });
  },
  subscriptions(){
    return [
      Meteor.subscribe('Cards', { _id: this.params._id }),
      Meteor.subscribe('Blocks', { cardIds: this.params._id }, { $fields: ['name'] }),
      Meteor.subscribe('Sets', { cardIds: this.params._id }, { $fields: ['name'] })
    ];
  }
});
