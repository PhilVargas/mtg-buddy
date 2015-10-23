Template.Navbar.events({
  'submit #nav-search'(e){
    e.preventDefault();
    Router.go(`/cards?name=${e.target.name.value}`);
  }
});

