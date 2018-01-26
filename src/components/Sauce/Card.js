import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FillerImage from "../../images/photos/sauce.jpg";
import Pencil from "../../images/icons/Pencil.js";
import { Heart, FilledHeart } from "../../images/icons/Heart";

const Card = ({
  ID,
  name,
  image,
  slug,
  description,
  displayEditIcon,
  heart,
  heartSauce,
  unHeartSauce
}) => {
  return (
    <div className="sauce">
      <div className="sauce-hero">
        <div className="sauce--actions">
          {displayEditIcon && (
            <div className="sauce--action sauce--action__edit">
              <Link to={`/sauce/${ID}/edit`}>
                <Pencil />
              </Link>
            </div>
          )}
          <div className="sauce--action sauce--action__heart">
            {heart ? (
              <button
                onClick={e => unHeartSauce(ID)}
                className="button--action__active"
              >
                <FilledHeart />
              </button>
            ) : (
              <button
                onClick={e => heartSauce(ID)}
                className="button--action__inactive"
              >
                <Heart />
              </button>
            )}
          </div>
        </div>
        <img
          src={FillerImage}
          onError={e => (e.target.src = FillerImage)}
          onLoad={e =>
            (e.target.src = `http://localhost:7777/public/uploads/${image}`)
          }
          title={name}
          alt={name}
        />
        <div className="sauce-title">
          <Link to={`/sauce/${slug}`}>{name}</Link>
        </div>
      </div>
      <div className="sauce-details">
        {/*{limit description to 25 words }*/}
        <p>
          {description
            .split(" ")
            .slice(0, 25)
            .join(" ")}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  ID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  displayEditIcon: PropTypes.bool.isRequired,
  heart: PropTypes.bool.isRequired,
  heartSauce: PropTypes.func.isRequired,
  unHeartSauce: PropTypes.func.isRequired
};

export default connect(null, {})(Card);
