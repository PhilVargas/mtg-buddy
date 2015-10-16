App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData(){
    return {
      cards: Cards.find({}).fetch()
    };
  },

  renderCards(){
    return this.data.cards.map((card, i) => {
      return <Card key={ i } {...card} />;
    });
  },

  render(){
    return (
      <div className='container'>
        <header>
          <h1>Cards yo</h1>
        </header>
        <ul>
          { this.renderCards() }
        </ul>
      </div>
    );
  }
});
