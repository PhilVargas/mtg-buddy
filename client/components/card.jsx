Card = React.createClass({
  displayName: 'Cards',

  propTypes: {
    block: React.PropTypes.string.isRequired,
    cmc: React.PropTypes.number.isRequired,
    colors: React.PropTypes.array.isRequired,
    imageUrl: React.PropTypes.string.isRequired,
    manaCost: React.PropTypes.string.isRequired,
    multiverseid: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    rarity: React.PropTypes.string.isRequired,
    set: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    types: React.PropTypes.array.isRequired,
    subtypes: React.PropTypes.array.isRequired,
    supertypes: React.PropTypes.array.isRequired
  },

  getDefaultProps(){
    return {
      cmc: 0,
      colors: ['colorless'],
      subtypes: [],
      supertypes: [],
      manaCost: '{0}',
      text: ''
    };
  },

  manaMap: {
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
  },

  renderManaSymbols(){
    return this.props.manaCost.match(/{[\d\/\w]+}+/ig).map((match, index) => {
      return <i key={ index } className={ `mtg ${this.manaMap[match.toLowerCase()]}` }></i>
    })
  },

  render(){
    return (
      <div className='card-container'>
        <h1>{ this.props.name }</h1>
        <span><img src={ this.props.imageUrl } /></span>
        <span>
          <div>block: { this.props.block }</div>
          <div>set: { this.props.set }</div>
          <div>colors: { this.props.colors.join(' ') }</div>
          <div>mana cost: {this.renderManaSymbols()}</div>
          <div>converted mana cost: { this.props.cmc }</div>
          <div>rarity: { this.props.rarity }</div>
          <div>types: { this.props.types.join(' ') }</div>
          <div>subtypes: { this.props.subtypes.join(' ') }</div>
          <div>supertypes: { this.props.supertypes.join(' ') }</div>
          <div>oracle: { this.props.text }</div>
        </span>

      </div>
    );
  }
});
