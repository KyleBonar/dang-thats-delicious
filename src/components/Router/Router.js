import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//pull in other components for SPA
import Header from "../Header/Header.js";
import Holder from "../Holder/Holder.js";
import Add from "../Add/Add.js";
import Stores from "../Stores/Stores.js";
import StoreGet from "../Store/StoreGet.js";
import StoreEdit from "../Store/StoreEdit.js";
import Tags from "../Tags/Tags.js";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">

          <Header />
          <Switch>
            <Route exact path="/" component={Holder} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/stores" component={Stores} />
            <Route exact path="/store/:slug" component={StoreGet} />
            <Route exact path="/store/:id/edit" component={StoreEdit} />
            <Route exact path="/tags" component={Tags} />
            <Route exact path="/tags/:tag" component={Tags} />
            <Route
              render={function() {
                return <p> Page not found. Sorry! </p>;
              }}
            />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

module.exports = Router;
