Pages = new Meteor.Pagination(Cards, {
  router: 'iron-router',
  homeRoute: '/cards/',
  templateName: 'CardsIndex',
  route: '/cards/page/',
  routerTemplate: 'CardsIndex',
  itemTemplate: 'CardsPage',
  availableSettings: {
    filters: true,
    sort: true
  },
  routeSettings(route){
    if (Object.keys(route.params.query).length > 0) {
      let query, params;

      params = route.params.query;
      query = { $and: [{ multiverseid: { $exists: true } }] };

      if (params.name) {
        query.$and.push({ name: { $regex: params.name, $options: 'i' } });
      }

      if (params.rarity) {
        query.$and.push({ 'rarity.value': params.rarity });
      }

      if (params.types) {
        query.$and.push({ types: params.types });
      }

      if (params.editionId) {
        query.$and.push({ $or: [{ 'set._id': params.editionId }, { 'block._id': params.editionId }] });
      }

      if (Number.isInteger(parseInt(params.minPower))) {
        query.$and.push({ power: { $gte: +params.minPower } });
      }

      if (Number.isInteger(parseInt(params.maxPower))) {
        query.$and.push({ power: { $lte: +params.maxPower } });
      }

      if (Number.isInteger(parseInt(params.minToughness))) {
        query.$and.push({ toughness: { $gte: +params.minToughness } });
      }

      if (Number.isInteger(parseInt(params.maxToughness))) {
        query.$and.push({ toughness: { $lte: +params.maxToughness } });
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

      this.set('filters', query);
    }
  },
  sort: { name: 1 }
});

