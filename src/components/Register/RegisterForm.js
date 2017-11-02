import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Validator from "validator";

import TextInput from "../TextInput/TextInput";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "abc",
        email: "abc@gmail.com",
        password: "a",
        confirmPassword: "a"
      },
      errors: {}
    };
  }
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Register</h2>

        <TextInput
          name="Name"
          onChange={this.handleNameChange}
          value={this.state.data.name}
          type="text"
        />

        <TextInput
          name="Email Address"
          onChange={this.handleEmailChange}
          value={this.state.data.email}
          type="email"
        />

        <TextInput
          name="Password"
          onChange={this.handlePasswordChange}
          value={this.state.data.password}
          type="password"
        />

        <TextInput
          name="Confirm Password"
          onChange={this.handleConfirmPasswordChange}
          value={this.state.data.confirmPassword}
          type="password"
        />

        <button type="submit" className="button">
          Register ->
        </button>
      </form>
    );
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (
      errors.name.length === 0 &&
      errors.email.length === 0 &&
      errors.password.length === 0 &&
      errors.confirmPassword.length === 0
    ) {
      this.props.onSubmit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    errors.name = !data.name ? "Cannot be empty" : "";
    errors.email = !Validator.isEmail(data.email) ? "Invalid email" : "";
    errors.password = !data.password ? "Cannot be empty" : "";
    errors.confirmPassword =
      !data.confirmPassword || data.confirmPassword !== data.password
        ? "Cannot be empty and must be the same as your password"
        : "";
    return errors;
  };

  handleNameChange = e => {
    this.setState({ data: { ...this.state.data, name: e.target.value } });
  };

  handleEmailChange = e => {
    this.setState({ data: { ...this.state.data, email: e.target.value } });
  };

  handlePasswordChange = e => {
    this.setState({ data: { ...this.state.data, password: e.target.value } });
  };

  handleConfirmPasswordChange = e => {
    this.setState({
      data: { ...this.state.data, confirmPassword: e.target.value }
    });
  };
}

export default RegisterForm;
