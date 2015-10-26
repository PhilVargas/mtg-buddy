let checkboxColors, _initSlider;

Template.SearchIndex.onRendered(function(){
  React.render(
    React.createElement(SearchForm, Object.assign({}, SearchStore.getAll(), { editionList: this.data.editionList })),
    document.getElementById('search-form-anchor')
  );
});

Template.SearchIndex.events({
  'submit #search'(e){
    e.preventDefault();
    Router.go(`/cards/?${$(e.target).serialize()}`);
  }
});

Template.SearchForm.onRendered(function(){
  _initSlider.call(this, 'power');
  _initSlider.call(this, 'toughness');
});

_initSlider = function(sliderType){
  let minValue, maxValue;

  minValue = -1;
  maxValue = 16;
  this.$(`#${sliderType}-slider`).slider({
    range: true,
    min: minValue,
    max: maxValue,
    values: [minValue, maxValue],
    step: 1,
    slide: (e, ui) => {
      let min, minLabel, max, maxLabel;

      if (ui.values[1] === maxValue) {
        max = '';
        maxLabel = 'Any';
      } else {
        max = ui.values[1];
        maxLabel = ui.values[1];
      }

      if (ui.values[0] === minValue) {
        min = '';
        minLabel = 'Any';
      } else {
        min = ui.values[0];
        minLabel = ui.values[0];
      }

      this.$(`#min-${sliderType}-label`).html(minLabel);
      this.$(`#min-${sliderType}`).val(min);
      this.$(`#max-${sliderType}-label`).html(maxLabel);
      this.$(`#max-${sliderType}`).val(max);
    }
  });
};

Template.SearchForm.helpers({
  colors(){
    return [
      { colorGroup: checkboxColors.mono },
      { colorGroup: checkboxColors.dual },
      { colorGroup: checkboxColors.tri },
      { colorGroup: checkboxColors.all }
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
    { value: 'White', icon: ['w'], label: '(White)' },
    { value: 'Blue', icon: ['u'], label: '(Blue)' },
    { value: 'Black', icon: ['b'], label: '(Black)' },
    { value: 'Red', icon: ['r'], label: '(Red)' },
    { value: 'Green', icon: ['g'], label: '(Green)' },
    { value: 'Colorless', icon: ['x'], label: '(Colorless)' }
  ],
  dual: [
    { value: 'White-Black', icon: ['w', 'b'], label: '(Orzhov)' },
    { value: 'White-Blue', icon: ['w', 'u'], label: '(Azorius)' },
    { value: 'Blue-Red', icon: ['u', 'r'], label: '(Izzet)' },
    { value: 'Blue-Black', icon: ['u', 'b'], label: '(Dimir)' },
    { value: 'Black-Green', icon: ['b', 'g'], label: '(Golgari)' },
    { value: 'Black-Red', icon: ['b', 'r'], label: '(Rakdos)' },
    { value: 'White-Red', icon: ['r', 'w'], label: '(Boros)' },
    { value: 'Red-Green', icon: ['r', 'g'], label: '(Gruul)' },
    { value: 'White-Green', icon: ['g', 'w'], label: '(Selesnya)' },
    { value: 'Blue-Green', icon: ['g', 'u'], label: '(Simic)' }
  ],
  tri: [
    { value: 'White-Black-Green', icon: ['w', 'b', 'g'], label: '(Abzan)' },
    { value: 'White-Blue-Black', icon: ['w', 'u', 'b'], label: '(Esper)' },
    { value: 'White-Blue-Red', icon: ['u', 'r', 'w'], label: '(Jeskai)' },
    { value: 'Blue-Black-Red', icon: ['u', 'b', 'r'], label: '(Grixis)' },
    { value: 'Blue-Black-Green', icon: ['b', 'g', 'u'], label: '(Sultai)' },
    { value: 'Black-Red-Green', icon: ['b', 'r', 'g'], label: '(Jund)' },
    { value: 'White-Black-Red', icon: ['r', 'w', 'b'], label: '(Mardu)' },
    { value: 'White-Red-Green', icon: ['r', 'g', 'w'], label: '(Naya)' },
    { value: 'White-Blue-Green', icon: ['g', 'w', 'u'], label: '(Bant)' },
    { value: 'Blue-Red-Green', icon: ['g', 'u', 'r'], label: '(Temur)' }
  ],
  all: [
    { value: 'White-Blue-Black-Red', icon: ['w', 'u', 'b', 'r'], label: '' },
    { value: 'White-Black-Red-Green', icon: ['b', 'r', 'g', 'w'], label: '' },
    { value: 'White-Blue-Black-Green', icon: ['g', 'w', 'u', 'b'], label: '' },
    { value: 'Blue-Black-Red-Green', icon: ['u', 'b', 'r', 'g'], label: '' },
    { value: 'White-Blue-Black-Red-Green', icon: ['w', 'u', 'b', 'r', 'g'], label: '' }
  ]
};
