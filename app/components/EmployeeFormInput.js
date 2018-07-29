import React from 'react';
import './employee-form-input.less';

export default class EmployeeFormInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }
  
  handleTextChange = (e) => {
    const { value } = e.target;
    this.setState({value});
  }

  renderForms = (count) => {
    const inputFields = [];

    for (let i = 0; i < count; i += 1) {
      inputFields.push(
        <div className="employee-form-container">
          <label>{i + 1 + ". "}</label>
          <input 
              type="text" 
              placeholder="Name"
            />
            <input 
              type="text" 
              placeholder="Phone Number"
            />
            <input 
              type="text" 
              placeholder="E-mail Address"
            />
            <select placeholder="role">
              <option value="Role">Admin</option>
              <option value="Role">Tech</option>
              <option value="Role">CSR</option>
              <option value="Role">Dispatch</option>
            </select>
          </div>
      );
    }
    return inputFields;
  }

  render() {
    return (
      <div> 
        <div className="employee-input-container">
            { this.renderForms(6) }
        </div>
      </div>
    );
  }
}
