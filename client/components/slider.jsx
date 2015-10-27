Meteor.startup(function(){
  Slider = React.createClass({
    displayName: 'Slider',

    propTypes: {
      containerClassName: React.PropTypes.string,
      handleSlide: React.PropTypes.func.isRequired,
      labelClassName: React.PropTypes.string,
      labelName: React.PropTypes.string,
      maxName: React.PropTypes.string.isRequired,
      maxRange: React.PropTypes.number.isRequired,
      maxValue: React.PropTypes.string.isRequired,
      minName: React.PropTypes.string.isRequired,
      minRange: React.PropTypes.number.isRequired,
      minValue: React.PropTypes.string.isRequired,
      sliderClassName: React.PropTypes.string
    },

    componentDidMount(){
      $(this.refs.slider.getDOMNode()).slider({
        range: true,
        min: this.props.minRange,
        max: this.props.maxRange,
        values: [this.props.minRange, this.props.maxRange],
        step: 1,
        slide: (e, ui) => {
          let min, max;

          min = (ui.values[0] === this.props.minRange ? '' : `${ui.values[0]}`);
          max = (ui.values[1] === this.props.maxRange ? '' : `${ui.values[1] + 1}`);
          this.props.handleSlide(min, max);
        }
      });
    },

    maxLabel(){
      return (this.props.maxValue === '' ? 'any' : this.props.maxValue);
    },

    minLabel(){
      return (this.props.minValue === '' ? 'any' : this.props.minValue);
    },

    render(){
      return (
        <div className={ this.props.containerClassName }>
          <div className='row'>
            <div className={ this.props.labelClassName }>
              { `${this.props.labelName}: ${this.minLabel()} to ${this.maxLabel()}` }
            </div>
          </div>
          <input type='hidden' value={ this.props.minValue } name={ this.props.minName } />
          <input type='hidden' value={ this.props.maxValue } name={ this.props.maxName } />
          <div className='row'>
            <div className={ this.props.sliderClassName }>
              <div ref='slider'></div>
            </div>
          </div>
        </div>
      );
    }
  });
});
