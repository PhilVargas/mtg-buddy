Meteor.startup(function(){
  SearchForm = React.createClass({
    displayName: 'SearchForm',

    mixins: [Reflux.connect(SearchStore)],

    propTypes: {
      editionId: React.PropTypes.string.isRequired,
      editionList: React.PropTypes.array.isRequired,
      keyword: React.PropTypes.string.isRequired,
      maxCmc: React.PropTypes.string.isRequired,
      maxPower: React.PropTypes.string.isRequired,
      maxToughness: React.PropTypes.string.isRequired,
      minCmc: React.PropTypes.string.isRequired,
      minPower: React.PropTypes.string.isRequired,
      minToughness: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      rarity: React.PropTypes.string.isRequired,
      types: React.PropTypes.string.isRequired
    },

    getInitialState(){
      return {
        name: this.props.name,
        rarity: this.props.rarity,
        types: this.props.types,
        editionId: this.props.editionId,
        maxCmc: this.props.maxCmc,
        minCmc: this.props.minCmc,
        maxPower: this.props.maxPower,
        minPower: this.props.minPower,
        minToughness: this.props.minToughness,
        maxToughness: this.props.maxToughness,
        keyword: this.props.keyword
      };
    },

    onChange(data){
      this.setState(data);
    },

    componentDidMount(){
      this.unsubscribe = SearchStore.listen(this.onChange);
    },

    componentWillUnmount(){
      this.unsubscribe();
    },

    renderEditionList(){
      return this.props.editionList.map((block) => {
        return [
          <option value={ block._id }>--- { block.name } Block ---</option>
        ].concat(block.sets.map((set) => {
          return <option value={ set._id }>{ set.name }</option>;
        }));
      });
    },

    render(){
      return (
        <form id='search' action='/search' name='search'>
          <div className='row'>
            <div className='columns large-4 large-offset-2 small-12'>
              <input {...this.nameProps()}/>
            </div>
            <div className='columns large-4 small-12 end'>
              <select {...this.rarityProps()}>
                <option value=''>Choose Rarity</option>
                <option value='Basic Land'>Basic Land</option>
                <option value='Common'>Common</option>
                <option value='Uncommon'>Uncommon</option>
                <option value='Rare'>Rare</option>
                <option value='Mythic Rare'>Mythic</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='columns large-4 large-offset-2 small-6'>
              <select {...this.typesProps()}>
                <option value=''>Any Type</option>
                <option value='Artifact'>Artifact</option>
                <option value='Creature'>Creature</option>
                <option value='Enchantment'>Enchantment</option>
                <option value='Instant'>Instant</option>
                <option value='Land'>Land</option>
                <option value='Planeswalker'>Planeswalker</option>
                <option value='Sorcery'>Sorcery</option>
              </select>
            </div>
            <div className='columns large-4 small-6 end'>
              <input id='fuzzy-type' type='text' name='fuzzy-type' placeholder='keyword' value='' />
            </div>
          </div>

          <div className='row'>
            <div className='columns large-4 large-offset-2 small-12'>
              <select {...this.editionProps()}>
                <option value=''>Any Edition</option>
                { this.renderEditionList() }
              </select>
            </div>
            <Slider {...this.cmcSliderProps()} />
          </div>

          <div className='row'>
            <Slider {...this.powerSliderProps()} />
            <Slider {...this.toughnessSliderProps()} />
          </div>

          <div className='row'>
            <div className='columns large-8 large-centered small-12'>
              <fieldset>
                <FormColors />
              </fieldset>
            </div>
          </div>


          <div className='row'>
            <div className='columns large-offset-2'>
              <button className='btn small' type='submit'>Search</button>
            </div>
          </div>
        </form>
      );
    },

    cmcSliderProps(){
      return {
        containerClassName: 'columns large-4 small-12 cmc-slider-container end',
        labelClassName: 'slider-label columns large-11 large-offset-1',
        labelName: 'casting cost',
        minName: 'minCmc',
        maxName: 'maxCmc',
        minValue: this.state.minCmc,
        maxValue: this.state.maxCmc,
        minRange: -1,
        maxRange: 16,
        handleSlide: SearchAction.updateCmc,
        sliderClassName: 'slider-container columns large-11 large-offset-1'
      };
    },

    toughnessSliderProps(){
      return {
        containerClassName: 'columns large-4 small-12 toughness-slider-container end',
        labelClassName: 'slider-label columns large-11 large-offset-1',
        labelName: 'toughness',
        minName: 'minToughness',
        maxName: 'maxToughness',
        minValue: this.state.minToughness,
        maxValue: this.state.maxToughness,
        minRange: -1,
        maxRange: 12,
        handleSlide: SearchAction.updateToughness,
        sliderClassName: 'slider-container columns large-11 large-offset-1'
      };
    },

    powerSliderProps(){
      return {
        containerClassName: 'columns large-4 large-offset-2 small-12 power-slider-container',
        labelClassName: 'slider-label columns large-11',
        labelName: 'power',
        minName: 'minPower',
        maxName: 'maxPower',
        minValue: this.state.minPower,
        maxValue: this.state.maxPower,
        minRange: -1,
        maxRange: 12,
        handleSlide: SearchAction.updatePower,
        sliderClassName: 'slider-container columns large-11'
      };
    },

    editionProps(){
      return {
        id: 'edition',
        name: 'editionId',
        value: this.state.editionId,
        onChange: SearchAction.selectEdition
      };
    },

    keywordProps(){
      return {
        id: 'fuzzy-type',
        type: 'text',
        name: 'fuzzy-type',
        placeholder: 'keyword',
        value: this.state.keyword,
        onChange: SearchAction.updateKeyword
      };
    },

    typesProps(){
      return {
        id: 'types',
        name: 'types',
        value: this.state.types,
        onChange: SearchAction.selectTypes
      };
    },

    rarityProps(){
      return {
        id: 'rarity',
        name: 'rarity',
        value: this.state.rarity,
        onChange: SearchAction.selectRarity
      };
    },

    nameProps(){
      return {
        type: 'text',
        name: 'name',
        placeholder: 'Card Name',
        value: this.state.name,
        onChange: SearchAction.updateName
      };
    }
  });
});
