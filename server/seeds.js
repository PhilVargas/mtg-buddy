let rarityRankMap;

rarityRankMap = {
  'Basic Land': 5,
  Common: 4,
  Uncommon: 3,
  Rare: 2,
  'Mythic Rare': 1
};

Meteor.methods({
  seed(){
    let gpt, sth, isd, dka, avr, rtr, gtc, dgm, ktk, ala, seeds;

    isd = Assets.getText('ISD.json');
    dka = Assets.getText('DKA.json');
    avr = Assets.getText('AVR.json');
    gtc = Assets.getText('GTC.json');
    dgm = Assets.getText('DGM.json');
    rtr = Assets.getText('RTR.json');
    ktk = Assets.getText('KTK.json');
    ala = Assets.getText('ALA.json');
    gpt = Assets.getText('GPT.json');
    sth = Assets.getText('STH.json');

    seeds = [isd, dka, avr, rtr, gtc, dgm, ktk, ala, gpt, sth];

    Cards.remove({});
    Blocks.remove({});
    Sets.remove({});

    seeds.forEach(function(seed){
      let block, set;

      seed = JSON.parse(seed);

      if (!Blocks.findOne({ name: seed.block })) {
        Blocks.insert({ name: seed.block, createdAt: new Date(), sets: [], cardIds: [] });
      }

      block = Blocks.findOne({ name: seed.block });

      if (!Sets.findOne({ name: seed.name })) {
        let setId;

        setId = Sets.insert({
          name: seed.name,
          setCode: seed.code,
          block: block._id,
          createdAt: new Date(),
          cardIds: [],
          releaseDate: new Date(seed.releaseDate)
        });

        Blocks.update({ _id: block._id }, { $push: { sets: { _id: setId, name: seed.name } } });
      }

      set = Sets.findOne({ name: seed.name });

      seed.cards.forEach(function(card){
        if (!Cards.findOne({ multiverseid: card.multiverseid })) {
          let attribs, cardId;

          attribs = {
            multiverseid: card.multiverseid,
            name: card.name,
            colors: card.colors || ['Colorless'],
            types: card.types || [],
            subtypes: card.subtypes || [],
            supertypes: card.supertypes || [],
            power: (typeof card.power === 'undefined' ? null : +card.power),
            toughness: (typeof card.toughness === 'undefined' ? null : +card.toughness),
            cmc: card.cmc || 0,
            rarity: { value: card.rarity, rank: rarityRankMap[card.rarity] },
            manaCost: card.manaCost || '{0}',
            oracle: card.text,
            flavor: card.flavor,
            set: { _id: set._id, name: set.name, setCode: set.setCode },
            block: { _id: block._id, name: block.name },
            imageUrl: `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseid}&type=card`,
            createdAt: new Date()
          };

          cardId = Cards.insert(attribs);
          Blocks.update({ _id: block._id }, { $push: { cardIds: cardId } });
          Sets.update({ _id: set._id }, { $push: { cardIds: cardId } });
        }
      });
    });
  }
});
