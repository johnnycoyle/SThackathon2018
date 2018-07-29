import React from 'react';
import './confirm-logo.less';

export default class ConfirmLogo extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogoConfirm = () => {
    this.props.onConfirm();
  }

  render() {
    return (
      <div className="confirm-logo-container">
        <h3>Should we use this logo for all locations?</h3>
        <h3 className="confirm-logo-text">Your logo is an important part of ServiceTitan and will be used on features like customer-facing invoices and forms.</h3>
        <img className="logo" src={require('./../assets/company_logo.png')}/>
        <div className="button-container">
          <button className="logo-button" onClick={this.handleLogoConfirm}> Yes </button>
          <button className="logo-button"> No </button>
        </div>
      </div>
    );
  }
}