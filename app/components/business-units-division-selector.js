import React from 'react';
import './business-units-division-selector.less';
import { Icon } from 'semantic-ui-react';

export default class BusinessUnitDivisionsSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: this.props.categories[0]
    }
  }

  handleClick = () => {
    this.props.goToNextSlide();
  }

  render() {
    const categories = ['Installs', 'Maintenance', 'Service', 'Sales'];
    return(
      <div className="divisions-container">
        { 
          this.props.categories.map((item, i) => (
            <div 
              className="divisions-selector-icon-container"
              name={item.name} 
              key={Math.random()} 
            >
                <img className="division-category-icon" src={item.icon}/>
            </div>
          ))
        }
        <h5>{`What are your ${this.props.name} divisions?`}</h5>
        {
          <div className="division-buttons">
            { categories.map(item => <Division name={item}/>) }
          </div>
        }
        <button className="next-button-divisions"
        onClick={this.handleClick}>
          <Icon size="large" color="white" name="arrow right"/>
        </button>
      </div>
    );
  }
}

class Division extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false }
  }

  handleClick = () => {
    this.setState({ selected: !this.state.selected})
  }

  render() {
    return (
      <button 
        className="division-toggle-button"
        onClick={this.handleClick}
        style={ this.state.selected ? { background: 'white', color: '#70A6A9' } : { background: 'none', color: 'white' }}
      >
        {this.props.name}
      </button>
    )
  }
}