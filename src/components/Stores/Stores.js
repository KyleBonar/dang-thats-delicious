import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import StoreCard from "../StoreCard/StoreCard.js";

import Auth from "../../helper/Auth/Auth.js";

class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: {},
      userID: ""
    };
  }

  componentDidMount() {
    //need this slight work around because "this" changes inside the .all scope
    const that = this;
    axios
      .all([that.getStores(), that.getUserID()])
      .then(
        axios.spread((stores, user) => {
          this.setState({ stores: stores.data, userID: user.data.user._id });
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="inner">
        <h2>Stores</h2>
        <div className="stores">
          {this.state.stores.length > 0 &&
            this.state.stores.map(store => {
              return (
                <StoreCard
                  userID={this.state.userID}
                  ID={store._id}
                  name={store.name}
                  image={store.photo}
                  slug={store.slug}
                  description={store.description}
                  key={store.slug}
                />
              );
            })}
        </div>
      </div>
    );
  }

  getStores() {
    return axios.get("http://localhost:7777/api/stores/get");
  }

  getUserID() {
    return (
      Auth.isUserAuthenticated() &&
      axios({
        method: "post",
        url: "http://localhost:7777/account/getInfo",
        data: { token: Auth.getToken() }
      })
    );
  }
}

module.exports = Stores;
