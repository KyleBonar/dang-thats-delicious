import * as React from "react";
import { Route } from "react-router-dom";
// import { connect } from "react-redux";
import Loadable from "react-loadable";

import styled from "../theme/styled-components";
import Loading from "../components/Holder/Holder";

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
`;

// Home
const Home = Loadable({
  loader: () => import("./home/Home"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Add Sauce
const SauceAdd = Loadable({
  loader: () => import("./sauce/screens/SauceAdd/SauceAdd"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// All Sauces
const Sauces = Loadable({
  loader: () => import("./sauces/Sauces"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Add Review
const ReviewAdd = Loadable({
  loader: () => import("./reviews/ReviewAdd"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Register
const Register = Loadable({
  loader: () => import("./register/Register"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Login
const Login = Loadable({
  loader: () => import("./login/Login"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Single
const SauceSpotlight = Loadable({
  loader: () => import("./sauce/screens/SauceSpotlight/SauceSpotlight"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

const Screens = (
  <StyledDiv>
    {/* {flashMessageVisible && <FlashMessage />} */}
    <Route exact path="/" component={Home} />
    <Route exact path="/sauce/add" component={SauceAdd} />
    <Route path="/review/add" component={ReviewAdd} />
    <Route path="/sauces" component={Sauces} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route exact path="/sauce" component={SauceSpotlight} />

    {/* <Route exact path="/sauce/edit/:id" component={SauceEdit} />
    <Route exact path="/sauce/single/:slug" component={SauceSingle} /> */}
    {/* <Route exact path="/tags" component={Tags} />
    <Route exact path="/tags/:tag" component={Tags} /> */}
    {/* <Route exact path="/register" component={Register} />
    <Route exact path="/account" component={Account} /> */}
    {/* <Route exact path="/account/reset/:token" component={ResetPassword} /> */}
    {/* <Route exact path="/login" component={Login} /> */}
  </StyledDiv>
);

export default Screens;
