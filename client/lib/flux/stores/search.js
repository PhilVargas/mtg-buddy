SearchStore = Reflux.createStore({
  listenables: SearchAction,

  init(opts = {}){
    this.name = opts.name || '';
  },

  getAll(){
    return {
      name: this.name
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

  onUpdateName(e){
    this.updateAttribs({ name: e.target.value })
    this.trigger(this.getAll());
  }
});
