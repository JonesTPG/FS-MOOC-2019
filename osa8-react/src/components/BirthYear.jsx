import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const BirthYear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const submit = async e => {
    e.preventDefault();

    console.log("update birthyear");

    await editAuthor({
      variables: {
        name: name,
        setBornTo: parseInt(born)
      }
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYear;
