Meteor.startup(function(){
  SearchStore = Reflux.createStore({
    listenables: SearchAction,

    init(){
      this.name = '';
      this.types = '';
      this.keyword = '';
      this.rarity = '';
      this.editionId = '';
    },

    getAll(){
      return {
        name: this.name,
        types: this.types,
        keyword: this.keyword,
        rarity: this.rarity,
        editionId: this.editionId,
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
    }
  });
})