import React, { Component } from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import AddAuthorCard from "./AddAuthorCard";

// Store
import authorStore from "./stores/AuthorStore";
import authStore from "./stores/authStore";

class AuthorsList extends Component {
  render() {
    // if (!authStore.user) return <Redirect to="/" />;
    const authorCards = authorStore.filteredAuthors.map(author => (
      <AuthorCard key={author.id} author={author} />
    ));

    return (
      <div className="authors">
        <h3>Authors</h3>
        <SearchBar store={authorStore} />
        <div className="row">
          {authStore.user && <AddAuthorCard />}
          {authorCards}
        </div>
      </div>
    );
  }
}

export default observer(AuthorsList);
