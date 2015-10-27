Meteor.startup(function(){
  FormColors = React.createClass({
    displayName: 'FormColors',

    propTypes: {
      colors: React.PropTypes.array.isRequired
    },

    getDefaultProps(){
      return {
        colors: CheckBoxColors.colors()
      };
    },

    renderColors(){
      return this.props.colors.map((colorGroups, i) => {
        return (
          <div className='columns large-3 small-6' key={ i }>
          {
            colorGroups.map((colorGroup, j) => {
              return (
                <div className='row' key={ j }>
                  <label>
                    <input type='checkbox' name='colors[]' value={ colorGroup.value } />
                    { "\u00A0" }
                    {
                      colorGroup.icon.map((iconClass, k) => {
                        return <i key={ k } className={ `mtg mana-${iconClass}` }></i>;
                      })
                    }
                    { "\u00A0" }
                    { colorGroup.label }
                  </label>
                </div>
              );
            })
          }
          </div>
        );
      });
    },

    render(){
      return (
        <div className='row collapse'>
          { this.renderColors() }
        </div>
      );
    }

  });
});


class CheckBoxColors {
  static mono(){
    return [
      { value: 'White', icon: ['w'], label: '(White)' },
      { value: 'Blue', icon: ['u'], label: '(Blue)' },
      { value: 'Black', icon: ['b'], label: '(Black)' },
      { value: 'Red', icon: ['r'], label: '(Red)' },
      { value: 'Green', icon: ['g'], label: '(Green)' },
      { value: 'Colorless', icon: ['x'], label: '(Colorless)' }
    ];
  }
  static dual(){
    return [
      { value: 'White-Black', icon: ['w', 'b'], label: '(Orzhov)' },
      { value: 'White-Blue', icon: ['w', 'u'], label: '(Azorius)' },
      { value: 'Blue-Red', icon: ['u', 'r'], label: '(Izzet)' },
      { value: 'Blue-Black', icon: ['u', 'b'], label: '(Dimir)' },
      { value: 'Black-Green', icon: ['b', 'g'], label: '(Golgari)' },
      { value: 'Black-Red', icon: ['b', 'r'], label: '(Rakdos)' },
      { value: 'White-Red', icon: ['r', 'w'], label: '(Boros)' },
      { value: 'Red-Green', icon: ['r', 'g'], label: '(Gruul)' },
      { value: 'White-Green', icon: ['g', 'w'], label: '(Selesnya)' },
      { value: 'Blue-Green', icon: ['g', 'u'], label: '(Simic)' }
    ];
  }
  static tri(){
    return [
      { value: 'White-Black-Green', icon: ['w', 'b', 'g'], label: '(Abzan)' },
      { value: 'White-Blue-Black', icon: ['w', 'u', 'b'], label: '(Esper)' },
      { value: 'White-Blue-Red', icon: ['u', 'r', 'w'], label: '(Jeskai)' },
      { value: 'Blue-Black-Red', icon: ['u', 'b', 'r'], label: '(Grixis)' },
      { value: 'Blue-Black-Green', icon: ['b', 'g', 'u'], label: '(Sultai)' },
      { value: 'Black-Red-Green', icon: ['b', 'r', 'g'], label: '(Jund)' },
      { value: 'White-Black-Red', icon: ['r', 'w', 'b'], label: '(Mardu)' },
      { value: 'White-Red-Green', icon: ['r', 'g', 'w'], label: '(Naya)' },
      { value: 'White-Blue-Green', icon: ['g', 'w', 'u'], label: '(Bant)' },
      { value: 'Blue-Red-Green', icon: ['g', 'u', 'r'], label: '(Temur)' }
    ];
  }
  static all(){
    return [
      { value: 'White-Blue-Black-Red', icon: ['w', 'u', 'b', 'r'], label: '' },
      { value: 'White-Black-Red-Green', icon: ['b', 'r', 'g', 'w'], label: '' },
      { value: 'White-Blue-Black-Green', icon: ['g', 'w', 'u', 'b'], label: '' },
      { value: 'Blue-Black-Red-Green', icon: ['u', 'b', 'r', 'g'], label: '' },
      { value: 'White-Blue-Black-Red-Green', icon: ['w', 'u', 'b', 'r', 'g'], label: '' }
    ];
  }
  static colors(){
    return [this.mono(), this.dual(), this.tri(), this.all()];
  }
}
