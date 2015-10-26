SearchForm = React.createClass({
  displayName: 'SearchForm',

  mixins: [Reflux.connect(SearchStore)],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  getInitialState(){
    return {
      name: this.props.name
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

  render(){
    return (
      <form id='search' action='/search' name='search'>
        <div className='row'>
          <div className='columns large-4 large-offset-2 small-12'>
            <input {...this.nameProps()}/>
          </div>
        </div>

        <button className='btn small' type='submit'>Search</button>
      </form>
    );
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
