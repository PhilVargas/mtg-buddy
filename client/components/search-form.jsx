Meteor.startup(function(){
  SearchForm = React.createClass({
    displayName: 'SearchForm',

    mixins: [Reflux.connect(SearchStore)],

    propTypes: {
      editionId: React.PropTypes.string.isRequired,
      editionList: React.PropTypes.array.isRequired,
      keyword: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      rarity: React.PropTypes.string.isRequired,
      types: React.PropTypes.string.isRequired,
    },

    getInitialState(){
      return {
        name: this.props.name,
        rarity: this.props.rarity,
        types: this.props.types,
        editionId: this.props.editionId,
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
      console.log(this.state)
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
            <div className='columns large-4 end'>
              <input id='fuzzy-type' type='text' name='fuzzy-type' placeholder='keyword' value='' />
            </div>
          </div>

          <div className="row">
            <div className="columns large-4 large-offset-2 small-12">
              <select {...this.editionProps()}>
                <option value=''>Any Edition</option>
                {this.renderEditionList()}
              </select>
            </div>
          </div>

          <button className='btn small' type='submit'>Search</button>
        </form>
      );
    },

    editionProps(){
      return {
        id: 'edition',
        name: 'editionId',
        value: this.state.editionId,
        onChange: SearchAction.selectEdition
      }
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
