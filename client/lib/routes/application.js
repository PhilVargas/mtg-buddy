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

// Router.route('/cards', function(){
//   this.render('CardsIndex', {
//     data(){
//       let results;
//
//       results = Cards.find({}, { sort: { name: 1 } });
//       return { results };
//     }
//   });
// }, {
//   name: 'cards.index',
//   subscriptions(){
//     let query, params;
//
//     params = this.params.query;
//     query = { $and: [{ multiverseid: { $exists: true } }] };
//
//     if (params.name) {
//       query.$and.push({ name: { $regex: params.name, $options: 'i' } });
//     }
//
//     if (params.rarity) {
//       query.$and.push({ rarity: params.rarity });
//     }
//
//     if (params.types) {
//       query.$and.push({ types: params.types });
//     }
//
//     if (params.editionId) {
//       query.$and.push({ $or: [{ 'set._id': params.editionId }, { 'block._id': params.editionId }] });
//     }
//
//     if (params.minPower !== '') {
//       query.$and.push({ power: { $gte: +params.minPower } });
//     }
//
//     if (params.maxPower !== '') {
//       query.$and.push({ power: { $lte: +params.maxPower } });
//     }
//
//     if (params.minToughness !== '') {
//       query.$and.push({ toughness: { $gte: +params.minToughness } });
//     }
//
//     if (params.maxToughness !== '') {
//       query.$and.push({ toughness: { $lte: +params.maxToughness } });
//     }
//
//     if (params['fuzzy-type']) {
//       query.$and.push({
//         $or: [
//           { supertypes: { $regex: params['fuzzy-type'], $options: 'i' } },
//           { subtypes: { $regex: params['fuzzy-type'], $options: 'i' } }
//         ]
//       });
//     }
//
//     if (params.colors) {
//       query.$and.push({
//         $or: params.colors.map((color) => {
//           return color.split('-');
//         }).map((colorSelectors) => {
//           return { colors: { $all: [colorSelectors] } };
//         })
//       });
//     }
//
//     return Meteor.subscribe('Cards', query);
//   }
// });

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
