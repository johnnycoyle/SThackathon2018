import React from 'react';
import FormInput from './FormInput';
import './confirm-locations.less';

export default class ConfirmLocations extends React.Component {

    constructor(props) {
      super(props);
    }
  render() {

    const form = [
      { label: 'Company', value: 'Hackathon Plumbing'},
      { label: 'Phone', value: '(310) 555.5555'},
      { label: 'Address', value: '801 N. Brand Ave, Ste 800 Glendale CA, 91203'}
    ]
    return(
        <div className="confirm-locations-container-two">
            <h3>Great. I see you also have a second location</h3>
            {
              form.map((data, i) => 
                <FormInput key={`formInput${i}`} label={data.label} value={data.value}/>
              )
            }
            <button className="secondary-confirm-button" onClick={this.props.onConfirm}>Looks good</button>
        </div>
    )
  }
}