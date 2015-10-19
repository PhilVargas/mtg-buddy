Router.route('/', function(){
  this.render('SearchIndex');
});

Router.route('/search', function(){
  let query, params;

  params = this.params.query;
  query = {};

  if (params.name) {
    query.name = { $regex: params.name, $options: 'i' };
  }

  if (params.rarity) {
    query.rarity = params.rarity;
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
