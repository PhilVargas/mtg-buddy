Template.Navbar.events({
  'submit #nav-search'(e){
    e.preventDefault();
    Router.go('search.show', {}, { query: $(e.target).serialize() });
  }
});

