App = React.createClass({

  getInitialState(){
    return {
      displayCard: Cards.find({}).fetch()
    };
  },

  handleSubmit(e){
    e.preventDefault();
    this.setState({
      displayCard: Cards.find({ }).fetch()
    });
  },

  renderCards(){
    return this.state.displayCard.map((card, i) => {
      return <Card key={ i } {...card} />;
    });
  },

  render(){
    return (
      <div className='container'>
        <header>
          <h1>Cards yo</h1>
        </header>
        <form onSubmit={ this.handleSubmit } className='search-form'>
          <button type='submit'>Fetch</button>
        </form>
        <section className='display-card'>
          { this.renderCards() }
        </section>
      </div>
    );
  }
});
