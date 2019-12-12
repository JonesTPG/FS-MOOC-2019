import React, { useState } from "react";
import Authors from "./components/Authors.jsx";
import Books from "./components/Books.jsx";
import NewBook from "./components/NewBook.jsx";
import Login from "./components/Login.jsx";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("login")}>login</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} />
    </div>
  );
};

export default App;
