let checkboxColors;

Template.SearchIndex.events({
  'submit #search'(e){
    e.preventDefault();
    Router.go('search.show', {}, { query: $(e.target).serialize() });
  }
});

Template.SearchForm.helpers({
  colors(){
    return [
      { colorGroup: checkboxColors.mono },
      { colorGroup: checkboxColors.dual },
      { colorGroup: checkboxColors.tri }
    ];
  },
  monoColors(){
    return checkboxColors.mono;
  },

  dualColors(){
    return checkboxColors.dual;
  },

  triColors(){
    return checkboxColors.tri;
  }
});

checkboxColors = {
  mono: [
    { value: 'White', icon: ['w'], label: 'White' },
    { value: 'Blue', icon: ['u'], label: 'Blue' },
    { value: 'Black', icon: ['b'], label: 'Black' },
    { value: 'Red', icon: ['r'], label: 'Red' },
    { value: 'Green', icon: ['g'], label: 'Green' },
    { value: 'Colorless', icon: ['x'], label: 'Colorless' }
  ],
  dual: [
    { value: 'White-Blue', icon: ['w', 'u'], label: 'Azorius' },
    { value: 'White-Black', icon: ['w', 'b'], label: 'Orzhov' },
    { value: 'White-Red', icon: ['w', 'r'], label: 'Boros' },
    { value: 'White-Green', icon: ['w', 'g'], label: 'Selesnya' },
    { value: 'Blue-Black', icon: ['u', 'b'], label: 'Dimir' },
    { value: 'Blue-Red', icon: ['u', 'r'], label: 'Izzet' },
    { value: 'Blue-Green', icon: ['u', 'g'], label: 'Simic' },
    { value: 'Black-Red', icon: ['b', 'r'], label: 'Rakdos' },
    { value: 'Black-Green', icon: ['b', 'g'], label: 'Golgari' },
    { value: 'Red-Green', icon: ['r', 'g'], label: 'Gruul' }
  ],
  tri: [
    { value: 'White-Black-Green', icon: ['w', 'b', 'g'], label: 'Abzan' },
    { value: 'White-Green-Blue', icon: ['w', 'g', 'u'], label: 'Bant' },
    { value: 'Blue-Red-White', icon: ['u', 'r', 'w'], label: 'Jeskai' },
    { value: 'Blue-White-Black', icon: ['u', 'w', 'b'], label: 'Esper' },
    { value: 'Black-Green-Blue', icon: ['b', 'g', 'u'], label: 'Sultai' },
    { value: 'Black-Blue-Red', icon: ['b', 'u', 'r'], label: 'Grixis' },
    { value: 'Red-White-Black', icon: ['r', 'w', 'b'], label: 'Mardu' },
    { value: 'Red-Black-Green', icon: ['r', 'b', 'g'], label: 'Jund' },
    { value: 'Green-Blue-Red', icon: ['g', 'u', 'r'], label: 'Temur' },
    { value: 'Green-Red-White', icon: ['g', 'r', 'w'], label: 'Naya' }
  ],
  all: []
};
