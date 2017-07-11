import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

import Auth from "../Auth/Auth.js";

//pull in logos
import MainLogo from "../../images/icons/Logo.js";
import StoresLogo from "../../images/icons/Store.js";
import TagLogo from "../../images/icons/Tag.js";
import TopLogo from "../../images/icons/Top.js";
import AddLogo from "../../images/icons/Add.js";
import MapLogo from "../../images/icons/Map.js";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      isUserLoggedIn: Auth.isUserAuthenticated()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isUserLoggedIn: nextProps.isUserLoggedIn });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ searchValue: "" });
  }

  handleSearchChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleLogout() {
    this.props.handleLogout();
  }

  render() {
    const navigationItems = [
      {
        text: "Stores",
        img: <StoresLogo />,
        linkTo: "stores",
        imgTitle: "Stores"
      },
      {
        text: "Tags",
        img: <TagLogo />,
        linkTo: "tags",
        imgTitle: "Tags"
      },
      {
        text: "Top",
        img: <TopLogo />,
        linkTo: "top",
        imgTitle: "Top"
      },
      {
        text: "Add",
        img: <AddLogo />,
        linkTo: "add",
        imgTitle: "Add"
      },
      {
        text: "Map",
        img: <MapLogo />,
        linkTo: "map",
        imgTitle: "Map"
      }
    ];
    return (
      <header className="top">
        <nav className="nav">
          <div className="nav-section nav-pages">
            {/*Home logo*/}
            <li className="nav-item">
              <NavLink
                className="nav-link home-link"
                activeClassName="active"
                to="/"
              >
                <MainLogo className="home-logo" />
              </NavLink>
            </li>

            {/*Rest of nav items*/}
            {navigationItems.map(item => {
              return (
                <li key={item.text} className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to={`/${item.linkTo}`}
                  >
                    {item.img}
                    <span>
                      {item.text.toUpperCase()}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </div>

          {/*Search bar*/}
          <div className="nav-section nav-search">
            <div className="search">
              <input
                type="text"
                placeholder="Coffee, beer..."
                name="search"
                onChange={this.handleSearchChange}
                value={this.state.searchValue}
              />
            </div>
          </div>

          {/*Register/Login/Logout*/}
          <div className="nav-section nav-user">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/register"
              >
                Register
              </NavLink>
            </li>

            {/*Login/Logout based on token*/}
            <li className="nav-item">
              {this.state.isUserLoggedIn
                ? <button onClick={this.handleLogout}>Logout</button>
                : <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/login"
                  >
                    Login
                  </NavLink>}
            </li>
          </div>
        </nav>
      </header>
    );
  }
}

module.exports = Header;
