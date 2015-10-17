Template.navbar.events({
  'submit #nav-search'(e){
    e.preventDefault();
    Router.go('search.show', { query: $(e.target).serialize() }, { query: $(e.target).serialize() });
  }
});

