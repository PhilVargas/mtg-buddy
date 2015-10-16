Card = React.createClass({
  displayName: 'Cards',

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render(){
    return (
      <li>{ this.props.name }</li>
    );
  }
});
