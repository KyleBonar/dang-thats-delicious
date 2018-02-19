import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addReview } from "../../redux/actions/review";
import { RatingSection } from "./Form";

class UserReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        descriptions: "",
        stars: 0
      },
      errors: { description: "", stars: "" }
    };
  }

  render() {
    const { description, stars } = this.state.data;
    return (
      <form onSubmit={this.onSubmit} className="reviewer">
        <textarea
          id="description"
          name="description"
          cols="30"
          rows="10"
          onChange={this.onChange}
          value={description}
          placeholder="Did you try this sauce? Have something to say? Leave a review..."
        />
        <div className="reviewer__actions">
          <div className="reviewer__stars">
            <RatingSection
              rating={stars}
              onClick={this.onRatingClick}
              height={25}
            />
          </div>
          <div className="reviewer__submit">
            <button type="submit" className="button button--submit">
              Submit Review ->
            </button>
          </div>
        </div>
      </form>
    );
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
      token: this.props.user.token,
      review: {
        text: this.state.data.description,
        rating: this.state.data.stars
      }
    };
    this.props
      .addReview(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onRatingClick = val => {
    this.setState({ ...this.state, data: { ...this.state.data, stars: val } });
  };
}
UserReview.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string.isRequired
  }),
  addReview: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: {
      token: state.user.token
    }
  };
};

const mapDispatchToProps = {
  addReview
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReview);
