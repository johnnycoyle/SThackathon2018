import React from 'react';
import './intro-conversation.less';
import FormInput from './form-input';

export default class IntroConversation extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {

    const form1 = [
      { label: 'Company', value: 'WyattWorks Plumbing'},
      { label: 'Phone', value: '(216) 302-3400'},
      { label: 'Address', value: '1372 Lloyd Rd, Wickliffe, OH 44092'}
    ];

    return(
      <div className="intro-conversation-container">
        <h3 className="text1">Let's get to know each other a bit.</h3>
        <h3 className="text2">Over the next few minutes, <br/> we'll be putting together your account basics.</h3>
        <h3 className="text3">Let's begin! <br/>First, we need to confirm a few things:</h3>
        <div className="confirm-locations-container">
          <h3>Does this look right?</h3>
          {
            form1.map((data, i) => 
              <FormInput key={`formInput${i}`} label={data.label} value={data.value}/>
            )
          }
        </div>
        <button className="confirm-first-location-button" onClick={this.props.onConfirm}>Looks good</button>
      </div>
    );
  }
}