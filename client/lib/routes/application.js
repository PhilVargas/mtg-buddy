Router.route('/', function(){
  this.render('SearchIndex', {
    data(){
      return {
        blockList: Blocks.find()
      };
    }
  });
}, {
  name: 'search.index',
  subscriptions(){
    return [Meteor.subscribe('Blocks', {}, { $fields: ['_id', 'name', 'sets'] })];
  }
});

Router.route('/cards/:_id', {
  name: 'cards.show',
  loadingTemplate: 'loading',
  action(){
    this.render('CardsShow', {
      data(){
        return {
          displayCard: Cards.findOne({ _id: this.params._id })
        };
      }
    });
  },
  subscriptions(){
    return [
      Meteor.subscribe('Cards', { _id: this.params._id })
    ];
  }
});
