import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SubmitReview from "./components/submitReview/SubmitReview";
import UserReview from "./components/userReview/UserReview";

import { getSauceBySlug } from "../../../../redux/actions/sauces";
import { flashError } from "../../../../redux/actions/flash";
import { host } from "../../../../utils/api/api";
import ComingSoon from "../../../../images/photos/ComingSoon.png";

const GenerateTagsList = ({ tags }) => (
  <ul className="tags">
    {tags.map(tag => (
      <li className="tag" key={tag}>
        <Link to={`/tags/${tag}`} className="tag-link">
          <span className="tag-text">#{tag}</span>
        </Link>
      </li>
    ))}
  </ul>
);
GenerateTagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

class SauceSingle extends Component {
  static propTypes = {
    sauce: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      photo: PropTypes.string,
      slug: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        sauce: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
        author: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired
      }).isRequired
    ).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string
      }).isRequired
    }).isRequired,
    getSauceBySlug: PropTypes.func.isRequired,
    flashError: PropTypes.func.isRequired
  };

  componentDidMount() {
    // save API call if we already have sauce and reviews in redux store
    if (this.props.sauce._id.length === 0 || this.props.reviews.length === 0) {
      const { slug } = this.props.match.params;
      this.getSauceBySlug({ slug });
    }
  }

  render() {
    return (
      <div className="inner">
        <div className="single">
          <div className="single-hero">
            <img
              alt={`User-submitted background for ${this.props.sauce.name}`}
              className="single-image"
              src={`${host}/public/uploads/${this.props.sauce.photo}`}
              onError={e => (e.target.src = ComingSoon)}
            />
            <h2 className="title title-single">
              <Link to={this.props.sauce.slug || "#"}>
                {this.props.sauce.name || "Loading..."}
              </Link>
            </h2>
          </div>
        </div>

        <div className="single--details">
          {/* description & tags */}
          {Object.keys(this.props.sauce).length > 0 && (
            <div className="inner">
              <p>{this.props.sauce.description}</p>
              {/* {this.props.sauce.tags.length > 0 && (
                <GenerateTagsList tags={this.props.sauce.tags} />
              )} */}
            </div>
          )}

          {/* Add review */}
          {Object.keys(this.props.sauce).length > 0 &&
            this.props.user.token && (
              <SubmitReview sauceID={this.props.sauce._id} />
            )}

          {/* All of the user reviews */}
          <div className="reviews">
            {this.props.reviews &&
              this.props.reviews.length > 0 &&
              this.props.reviews.map(review => (
                <UserReview _id={review._id} key={review._id} />
              ))}
          </div>
        </div>
      </div>
    );
  }

  getSauceBySlug = ({ slug }) => {
    this.props.getSauceBySlug(slug).catch(err => {
      console.log(err);
      // this.props.flashError({ text: err.response.data.msg });
    });
  };
}

// TODO figure out better way to organize this
const mapStateToProps = (state, ownProps) => {
  // get the ID of the sauce that matches the page slug
  const sauceID =
    state.sauces.allIds &&
    state.sauces.allIds.length > 0 &&
    state.sauces.byId &&
    Object.keys(state.sauces.byId).length > 0 &&
    state.sauces.allIds.find(
      x => state.sauces.byId[x].slug === ownProps.match.params.slug
    );

  // init reviews
  const reviews = [];
  // push reviews that are related to the current page's sauce
  if (sauceID && state.reviews) {
    state.reviews.allIds.forEach(x => {
      if (state.reviews.byId[x].sauce._id === sauceID) {
        reviews.push(state.reviews.byId[x]);
      }
    });
  }

  const sauce = sauceID // find specific sauce or set default values
    ? state.sauces.byId[sauceID]
    : {
        _id: "",
        name: "",
        description: "",
        photo: "",
        slug: "",
        tags: [""]
      };

  const user = {
    token: state.users.self.token || ""
  };

  return {
    user,
    sauce,
    reviews
  };
};

const mapDispatchToProps = {
  getSauceBySlug,
  flashError
};

export default connect(mapStateToProps, mapDispatchToProps)(SauceSingle);
