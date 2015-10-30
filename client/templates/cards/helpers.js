let manaMap, typesMap, formattedManaCost, formattedSetSymbol, _getSortInfo, _sortMap;

formattedManaCost = function(cost){
  let formattedCost;

  formattedCost = [];

  if (cost) {
    formattedCost = cost.match(/{[\d\/\w]+}+/ig).map((match) => {
      return `<i class="mtg ${manaMap[match.toLowerCase()]}"></i>`;
    });
  }

  return formattedCost.join('');
};

formattedSetSymbol = function(card){
  if (!card) { return; }
  return `<i class="mtg ${card.set.name.toLowerCase().replace(/\s/g, '-').replace(/[']/g, '')} ${card.rarity.value.toLowerCase()}"></i>`;
};

_sortMap = {
  'set.name': 'Set',
  'rarity.rank': 'Rarity',
  cmc: 'Converted Cost',
  name: 'Name'
};

_getSortInfo = function(){
  let sortType, sortOrder;

  sortType = Object.keys(Pages.sort)[0];
  sortOrder = (Pages.sort[sortType] === -1 ? 'Desc' : 'Asc');

  return `Sort by: ${_sortMap[sortType]} (${sortOrder})`;
};

Template.CardsIndex.onCreated(function(){
  this.sortInfo = new ReactiveVar(_getSortInfo());
})

Template.CardsIndex.events({
  'change select.per-page'(e){
    Pages.set({ perPage: +e.target.value })
  },

  'click .previous-page'(e){
    e.preventDefault();
    Router.go('search.index');
  },

  'click #name-header'(e, template){
    let sortOrder;

    sortOrder = (Pages.sort.name === 1 ? -1 : 1);
    Pages.set({ sort: { name: 1 * sortOrder } });
    template.sortInfo.set(_getSortInfo());
  },

  'click #edition-header'(e, template){
    let sortOrder;

    sortOrder = (Pages.sort['set.name'] === 1 ? -1 : 1);
    Pages.set({ sort: { 'set.name': 1 * sortOrder, name: 1 } });
    template.sortInfo.set(_getSortInfo());
  },

  'click #rarity-header'(e, template){
    let sortOrder;

    sortOrder = (Pages.sort['rarity.rank'] === 1 ? -1 : 1);
    Pages.set({ sort: { 'rarity.rank': 1 * sortOrder, name: 1 } });
    template.sortInfo.set(_getSortInfo());
  },

  'click #cost-header'(e, template){
    let sortOrder;

    sortOrder = (Pages.sort.cmc === 1 ? -1 : 1);
    Pages.set({ sort: { cmc: 1 * sortOrder, 'set.name': 1, name: 1 } });
    template.sortInfo.set(_getSortInfo());
  }
});

Template.CardsIndex.helpers({
  sortInfo(){
    return Template.instance().sortInfo.get();
  },

  formattedManaCost,

  formattedSetSymbol,

  formattedPowerToughness(card){
    let power, toughness;

    power = parseInt(card.power);
    toughness = parseInt(card.toughness);

    if (isNaN(power) || isNaN(toughness)) {
      return '-';
    } else {
      return `${power}/${toughness}`;
    }
  },

  formattedTypes(card){
    let types, supertypes, formattedTypes;

    supertypes = card.supertypes.map((supertype) => {
      return typesMap[supertype];
    });

    types = card.types.map((type) => {
      return typesMap[type];
    });

    formattedTypes = supertypes.concat(types);

    if (card.subtypes.length > 0) {
      formattedTypes = formattedTypes.concat(['-'], card.subtypes);
    }

    return formattedTypes.join(' ');
  }
});

Template.CardsPage.helpers({
  formattedManaCost,

  formattedSetSymbol,

  formattedPowerToughness(card){
    let power, toughness;

    power = parseInt(card.power);
    toughness = parseInt(card.toughness);

    if (isNaN(power) || isNaN(toughness)) {
      return '-';
    } else {
      return `${power}/${toughness}`;
    }
  },

  formattedTypes(card){
    let types, supertypes, formattedTypes;

    supertypes = card.supertypes.map((supertype) => {
      return typesMap[supertype];
    });

    types = card.types.map((type) => {
      return typesMap[type];
    });

    formattedTypes = supertypes.concat(types);

    if (card.subtypes.length > 0) {
      formattedTypes = formattedTypes.concat(['-'], card.subtypes);
    }

    return formattedTypes.join(' ');
  }
});

Template.CardsShow.helpers({
  notNull(attrib){
    return !(attrib === null || typeof attrib === 'undefined');
  },

  notEmpty(attrib){
    return attrib && attrib.length > 0;
  },

  formattedManaCost,

  formattedSetSymbol,

  formattedOracle(){
    let oracle;

    oracle = [];

    if (this.displayCard && this.displayCard.oracle) {
      oracle = this.displayCard.oracle.split(/({[\d\/\w]+}+)/ig).map((text) => {
        if (text.match(/{[\d\/\w]+}+/ig)) {
          return `<i class="mtg ${manaMap[text.toLowerCase()]}"></i>`;
        } else {
          return text;
        }
      });
    }

    return oracle.join('');
  }
});

typesMap = {
  Legendary: 'Leg',
  Basic: 'Basic',
  Artifact: 'Art',
  Creature: 'Cr',
  Enchantment: 'Enchant',
  Instant: 'Instant',
  Land: 'Land',
  Planeswalker: 'Planeswalker',
  Sorcery: 'Sorcery'
};

manaMap = {
  '{t}': 'tap',
  '{x}': 'mana-x',
  '{0}': 'mana-0',
  '{1}': 'mana-1',
  '{2}': 'mana-2',
  '{3}': 'mana-3',
  '{4}': 'mana-4',
  '{5}': 'mana-5',
  '{6}': 'mana 6',
  '{7}': 'mana-7',
  '{8}': 'mana-8',
  '{9}': 'mana-9',
  '{10}': 'mana-10',
  '{w}': 'white mana-w',
  '{u}': 'blue mana-u',
  '{b}': 'black mana-b',
  '{r}': 'red mana-r',
  '{g}': 'green mana-g',
  '{w/u}': 'hybrid-wu',
  '{w/b}': 'hybrid-wb',
  '{u/b}': 'hybrid-ub',
  '{u/r}': 'hybrid-ur',
  '{b/r}': 'hybrid-br',
  '{b/g}': 'hybrid-bg',
  '{r/g}': 'hybrid-rg',
  '{r/w}': 'hybrid-rw',
  '{g/w}': 'hybrid-gw',
  '{g/u}': 'hybrid-gu',
  '{2/w}': 'hybrid-2w',
  '{2/u}': 'hybrid-2u',
  '{2/b}': 'hybrid-2b',
  '{2/r}': 'hybrid-2r',
  '{2/g}': 'hybrid-2g'
};
