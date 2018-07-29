import React from 'react';
import './trade-selector.less';
import { Icon } from 'semantic-ui-react';

export default class TradeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  handleClick = () => {
    this.setState({ selected: !this.state.selected})
  }
  
  render() {
    return(
      <div className="trade-selector-item-container"onClick={this.handleClick}>
        <div className="trade-selector-item"
          style={ this.state.selected ? { boxShadow: '4px 1px 5px 2px rgba(0,0,0,.1)'} : null}
        >
          { this.state.selected && 
            <div className="trade-selector-corner-check-mark">
              <Icon className="check-mark-icon" name="check mark" color="white" size="mini"/>
            </div>
          }
          <img src={this.props.icon}/>
        </div>
        <h2>{this.props.name}</h2>
      </div>
    )
  }
}