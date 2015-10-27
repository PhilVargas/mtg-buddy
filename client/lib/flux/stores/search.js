Meteor.startup(function(){
  SearchStore = Reflux.createStore({
    listenables: SearchAction,

    init(opts = {}){
      this.name = opts.name || '';
      this.types = opts.types || '';
      this.keyword = opts.keyword || '';
      this.rarity = opts.rarity || '';
      this.editionId = opts.editionId || '';
      this.maxPower = opts.maxPower || '';
      this.minPower = opts.minPower || '';
      this.minToughness = opts.minToughness || '';
      this.maxToughness = opts.maxToughness || '';
    },

    getAll(){
      return {
        name: this.name,
        types: this.types,
        keyword: this.keyword,
        rarity: this.rarity,
        editionId: this.editionId,
        maxPower: this.maxPower,
        minPower: this.minPower,
        minToughness: this.minToughness,
        maxToughness: this.maxToughness
      };
    },

    get(attr){
      return this[attr];
    },

    updateAttribs(attr){
      for (const key in attr) {
        if (this.hasOwnProperty(key)) {
          Object.assign(this, { [key]: attr[key] });
        }
      }
    },

    onSelectEdition(e){
      this.updateAttribs({ editionId: e.target.value });
      this.trigger(this.getAll());
    },

    onSelectTypes(e){
      this.updateAttribs({ types: e.target.value });
      this.trigger(this.getAll());
    },

    onSelectRarity(e){
      this.updateAttribs({ rarity: e.target.value });
      this.trigger(this.getAll());
    },

    onUpdateKeyword(e){
      this.updateAttribs({ keyword: e.target.value });
      this.trigger(this.getAll());
    },

    onUpdateName(e){
      this.updateAttribs({ name: e.target.value });
      this.trigger(this.getAll());
    },

    onUpdateToughness(minToughness, maxToughness){
      this.updateAttribs({ minToughness, maxToughness });
      this.trigger(this.getAll());
    },

    onUpdatePower(minPower, maxPower){
      this.updateAttribs({ minPower, maxPower });
      this.trigger(this.getAll());
    }
  });
});
