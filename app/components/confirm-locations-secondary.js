import React from 'react';
import FormInput from './form-input';
import './confirm-locations.less';

export default class ConfirmLocationsSecondary extends React.Component {
  render() {

    const form = [
      { label: 'Company', value: 'Hackathon Plumbing'},
      { label: 'Phone', value: '(310) 555.5555'},
      { label: 'Address', value: '801 N. Brand Ave, Ste 800 Glendale CA, 91203'}
    ]
    return(
        <div className="confirm-locations-container">
            <h3>Does this look right?</h3>
            {
              form.map((data, i) => 
                <FormInput key={`formInput${i}`} label={data.label} value={data.value}/>
              )
            }
        </div>
    )
  }
}