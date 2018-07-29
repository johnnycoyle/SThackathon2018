import React from 'React';
import './business-units-division-selector.less';

export default class BusinessUnitDivisionsSelector extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="divisions-container">
        <h3>What are your {this.props.category} divisions?</h3>
      </div>
    );
  }
}