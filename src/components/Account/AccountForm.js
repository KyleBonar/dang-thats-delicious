import React, { Component } from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import TextInput from "../TextInput/TextInput";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        email: ""
      },
      errors: {
        name: "",
        email: ""
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });
  }

  render() {
    const { name, email } = this.state.data;
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <h2>Settings</h2>

        <TextInput
          type="text"
          id="name"
          name="Name"
          value={name}
          onChange={this.handleNameChange}
        />
        {this.state.errors.name && (
          <p className="form-error">*{this.state.errors.name}</p>
        )}

        <TextInput
          type="email"
          id="email"
          name="Email"
          value={email}
          onChange={this.handleEmailChange}
        />
        {this.state.errors.email && (
          <p className="form-error">*{this.state.errors.email}</p>
        )}

        <button type="submit" className="button button--submit">
          Save ->
        </button>
      </form>
    );
  }

  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (errors.name.length === 0 && errors.email.length === 0) {
      this.props.onSubmit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    errors.name = !data.name ? "Cannot be empty" : "";
    errors.email = !Validator.isEmail(data.email) ? "Invalid email" : "";
    return errors;
  };

  handleNameChange = e => {
    this.setState({ data: { ...this.state.data, name: e.target.value } });
  };

  handleEmailChange = e => {
    this.setState({ data: { ...this.state.data, email: e.target.value } });
  };
}

export default AccountForm;
