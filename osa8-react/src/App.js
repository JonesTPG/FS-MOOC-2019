import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  useQuery,
  useApolloClient,
  useSubscription
} from "@apollo/react-hooks";
import Authors from "./components/Authors.jsx";
import Books from "./components/Books.jsx";
import NewBook from "./components/NewBook.jsx";
import Login from "./components/Login.jsx";
import Recommend from "./components/Recommend.jsx";
import { USER_FAVORITE_GENRE, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      window.alert(
        "new book was added:" + subscriptionData.data.bookAdded.title
      );
    }
  });

  //get the token from local storage if it exists there
  useEffect(() => {
    const localStorageToken = window.localStorage.getItem("library-app-token");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, []);

  //handle log out event
  const handleLogOut = () => {
    window.localStorage.removeItem("library-app-token");
    setToken(null);
    setPage("authors");
  };

  const setTokenFromLogin = token => {
    setToken(token);
    setPage("authors");
  };

  return (
    <>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token === "" || token === null ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => handleLogOut()}>logout</button>
          </>
        )}
      </div>

      <Authors token={token} show={page === "authors"} />

      <Books show={page === "books"} />

      <Recommend token={token} show={page === "recommend"} />

      <NewBook show={page === "add"} />

      <Login setToken={setTokenFromLogin} show={page === "login"} />
    </>
  );
};

export default App;
