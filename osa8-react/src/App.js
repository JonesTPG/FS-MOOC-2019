import React, { useState, useEffect } from "react";
import Authors from "./components/Authors.jsx";
import Books from "./components/Books.jsx";
import NewBook from "./components/NewBook.jsx";
import Login from "./components/Login.jsx";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

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
            <button onClick={() => handleLogOut()}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login setToken={setTokenFromLogin} show={page === "login"} />
    </>
  );
};

export default App;
