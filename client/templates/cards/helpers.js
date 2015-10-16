let manaMap;

Template.cardTemplate.helpers({
  display(){
    let displayCard;

    displayCard = Object.assign({},
      { manaCost: '{0}', cost: 0, text: '', power: null, toughness: null, types: [], subtypes: [], supertypes: [], colors: ['colorless'] },
      Cards.findOne({ name: { $regex: 'abrupt', $options: 'i' } })
    );
    displayCard.manaSymbolClasses = displayCard.manaCost.match(/{[\d\/\w]+}+/ig).map((match) => {
      return { value: `mtg ${manaMap[match.toLowerCase()]}` };
    });
    return displayCard;
  }
});

manaMap = {
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
