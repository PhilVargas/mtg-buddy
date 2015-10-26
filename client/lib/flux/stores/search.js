SearchStore = Reflux.createStore({
  listenables: SearchAction,

  init(opts = {}){
    this.name = opts.name || '';
    this.types = opts.types || '';
    this.keyword = opts.keyword || '';
    this.rarity = opts.rarity || '';
    this.editionList = opts.editionList || [];
  },

  getAll(){
    return {
      name: this.name,
      types: this.types,
      keyword: this.keyword,
      rarity: this.rarity,
      editionList: this.editionList,
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
  }
});
