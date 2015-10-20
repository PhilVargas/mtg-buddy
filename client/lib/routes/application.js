Router.route('/', function(){
  this.render('SearchIndex', {
    data(){
      return {
        blockList: Blocks.find({}, { $fields: ['_id', 'name', 'setIds'] })
      };
    }
  });
});

Router.route('/search', function(){
  let query, params;

  params = this.params.query;
  query = { $and: [] };

  if (params.name) {
    query.$and.push({ name: { $regex: params.name, $options: 'i' } });
    // query.name = { $regex: params.name, $options: 'i' };
  }

  if (params.rarity) {
    query.$and.push({ rarity: params.rarity });
    // query.rarity = params.rarity;
  }

  if (params.set) {
    query.$and.push({ $or: [{ setId: params.set }, { blockId: params.set }] });
    // query.setId = params.set;
  }

  this.render('SearchShow', {
    data(){
      return { results: Cards.find(query).fetch() };
    }
  });
}, {
  name: 'search.show'
});

Router.route('/cards/:multiverseid', function(){
  let displayCard, displaySet, displayBlock;

  this.wait(() => displayCard = Cards.findOne({ multiverseid: +this.params.multiverseid }));
  this.wait(() => displaySet = Sets.findOne({ _id: displayCard.setId }, { $fields: ['name'] }));
  this.wait(() => displayBlock = Blocks.findOne({ _id: displayCard.blockId }, { $fields: ['name'] }));

  if (this.ready()) {
    this.render('CardShow', {
      data: () => {
        return {
          displayCard,
          displaySet: displaySet.name,
          displayBlock: displayBlock.name
        };
      }
    });
  } else {
    this.render('loading');
  }
}, {
  name: 'card.show'
});
