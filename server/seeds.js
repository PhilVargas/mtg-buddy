Meteor.methods({
  seed(){
    let isd, dka, avr, rtr, gtc, dgm, seeds;

    isd = Assets.getText('ISD.json');
    dka = Assets.getText('DKA.json');
    avr = Assets.getText('AVR.json');
    gtc = Assets.getText('GTC.json');
    dgm = Assets.getText('DGM.json');
    rtr = Assets.getText('RTR.json');

    seeds = [isd, dka, avr, rtr, gtc, dgm];

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
            colors: card.colors || ['colorless'],
            types: card.types || [],
            subtypes: card.subtypes || [],
            supertypes: card.supertypes || [],
            power: card.power || 0,
            toughness: card.toughness || 0,
            cmc: card.cmc || 0,
            rarity: card.rarity,
            manaCost: card.manaCost || '{0}',
            oracle: card.text,
            flavor: card.flavor,
            setId: set._id,
            blockId: block._id,
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
