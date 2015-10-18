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

