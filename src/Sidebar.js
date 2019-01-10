import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { observer } from "mobx-react";

// Logo
import logo from "./assets/theindex.svg";
import authStore from "./stores/authStore";

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
          <h4 className="menu-item">
            <NavLink to="/books">BOOKS</NavLink>
          </h4>
          {authStore.user ? (
            <h4
              className="menu-item text-danger"
              onClick={() => authStore.logoutUser()}
            >
              Logout {authStore.user.username}
            </h4>
          ) : (
            <div>
              <h4 className="menu-item">
                <NavLink to="/login/">Login</NavLink>
              </h4>
              <h4 className="menu-item">
                <NavLink to="/signup/">SignUp</NavLink>
              </h4>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default observer(Sidebar);
