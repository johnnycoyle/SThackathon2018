import React from 'react';
import './logo-upload.less';

export default class LogoUpload extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="logo-upload-container">
        <h3>We don't know what your logo looks like</h3>
        <h3 className="logo-explanation-text">Your logo is an important part of ServiceTitan and will be used on features like customer-facing invoices and forms.</h3>
        <h3 onClick={this.props.onConfirm} className="upload-link">Upload Logo</h3>
      </div>
    );
  }
}