import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Fire from "react-icons/lib/fa/fire";

import { host } from "../../../../../../utils/api/api";
import ComingSoon from "../../../../../../images/photos/ComingSoon.png";

const SingleHero = ({ sauce }) => (
  <div className="single__container--tilted">
    {sauce && (
      <div className="single__container">
        <div className="single__header">
          <h3 className="single__title">
            <Link to={sauce.slug || "#"}>{sauce.name || "Loading..."}</Link>
          </h3>
        </div>
        <div className="single__content">
          <div className="single__image__container">
            <img
              alt={`User-submitted background for ${sauce.name}`}
              className="single__image"
              src={`${host}/public/uploads/${sauce.photo}`}
              onError={e => (e.target.src = ComingSoon)}
            />
          </div>
          <div className="single__information">
            <div className="single__item">
              <div className="item__icon">
                <Fire />
              </div>
              <div className="item__body">
                <div className="item__title">Heat</div>
                <div className="item__desc">description stuff</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
SingleHero.propTypes = {
  sauce: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    slug: PropTypes.string.isRequired
  })
};

SingleHero.defaultProps = {
  sauce: {
    name: "",
    photo: "",
    slug: ""
  }
};

export default SingleHero;
