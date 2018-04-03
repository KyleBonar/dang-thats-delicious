import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AccountForm from "./AccountForm";
import api from "../../api/api";
import { flashError, flashClose } from "../../redux/actions/flash";
import { getInfo, updateUser } from "../../redux/actions/user";

class Account extends Component {
  componentWillMount() {
    if (!this.props.user.token) this.props.history.push("/login");
  }

  componentDidMount() {
    if (!this.props.user.token) return;
    this.getUserInfo();
  }

  render() {
    //check if state exists at all first
    const { name = "", email = "" } = this.props.user;
    return (
      <div className="inner">
        <AccountForm name={name} email={email} onSubmit={this.onSubmit} />
      </div>
    );
  }

  getUserInfo = () => {
    const data = { user: { token: this.props.user.token } };

    this.props
      .getInfo(data)
      .then(res => {
        //do something here...?
      })
      .catch(err => {
        this.props.flashError({ text: err.response.data.msg });
      });
  };

  onSubmit = e => {
    //close flash
    this.props.flashClose();

    //add token to data so we can look up user
    const data = {
      update: { name: e.name, email: e.email },
      user: { token: this.props.user.token }
    };
    this.props.updateUser(data).catch(err => {
      this.props.flashError({ text: err.response.data.msg });
    });
  };
}

Account.propType = {
  user: {
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  },
  getInfo: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired,
  flashClose: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: {
      email: state.user.email,
      name: state.user.name,
      token: state.users.self.token
    }
  };
}

const mapDispatchToProps = {
  getInfo,
  updateUser,
  flashError,
  flashClose
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
