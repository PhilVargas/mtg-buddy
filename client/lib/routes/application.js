Router.route('/', {
  action(){
    this.render('SearchIndex', {
      data(){
        return {
          editionList: Blocks.find({}).fetch()
        };
      }
    });
  },
  onBeforeAction(){
    Pages.unsubscribe();
    this.next();
  },
  loadingTemplate: '_pagesLoading',
  name: 'search.index',
  waitOn(){
    return [Meteor.subscribe('Blocks', {}, { $fields: ['_id', 'name', 'sets'] })];
  }
});

Router.route('/cards/:_id', {
  name: 'cards.show',
  loadingTemplate: 'pagesLoading',
  onBeforeAction(){
    Pages.unsubscribe();
    this.next();
  },
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
