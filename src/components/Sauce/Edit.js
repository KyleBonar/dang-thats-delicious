import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInfo as getUserInfo } from "../../redux/actions/user";
import {
  getSauceById as getSauceInfo,
  updateSauce
} from "../../redux/actions/sauce";
import { flashError } from "../../redux/actions/flash";

import Form from "./Form";

class Edit extends Component {
  componentWillMount() {
    if (!this.props.user.token) this.props.history.push("/login");
  }

  componentDidMount() {
    if (!this.props.user.token) return;
    axios.all([this.getSauceInfo(), this.getUserInfo()]).catch(error => {
      console.log(error);
      // this.props.flashError({ text: error.response.data.msg });
    });
  }

  render() {
    const {
      name = "",
      description = "",
      photo = "",
      tags = []
    } = this.props.sauce;

    return (
      <div className="inner">
        <h2>Edit {name || "Sauce"}</h2>
        {Object.keys(this.props.sauce).length > 0 && (
          <Form
            onSubmit={this.handleSubmit}
            name={name}
            description={description}
            photo={photo}
            tags={tags}
          />
        )}
      </div>
    );
  }

  //get information about user
  getUserInfo = () => {
    //check if email already passed to component to save api call
    if (this.props.user.email) return;
    const data = { token: this.props.user.token };
    return this.props.getUserInfo(data);
  };

  //get single sauce information
  //must pass user token and ID we are looking for
  getSauceInfo = () => {
    const data = {
      token: this.props.user.token,
      sauceID: this.props.match.params.id
    };
    return this.props.getSauceInfo(data);
  };

  handleSubmit = data => {
    //make tags an array of checked tags
    const tags = data.tags.filter(tag => tag.isChecked).map(tag => tag.name);

    //construct FormData object since we are passing image file
    const formData = new FormData();
    formData.append("sauceID", this.props.match.params.id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.photo.file);
    formData.append("tags", tags);
    formData.append("token", this.props.user.token);

    this.props
      .updateSauce(formData)
      .then(res => {
        this.props.history.push(`/sauce/${res.sauce.slug}`);
      })
      .catch(err => console.log(err));
  };
}

Edit.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  sauce: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    slug: PropTypes.string
  }),
  getSauceInfo: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired,
  updateSauce: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: { token: state.user.token, email: state.user.email },
    sauce: state.sauce
  };
};

const mapDispatchToProps = {
  getSauceInfo,
  getUserInfo,
  flashError,
  updateSauce
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
