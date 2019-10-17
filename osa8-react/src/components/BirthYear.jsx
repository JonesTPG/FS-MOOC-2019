import React, { useState } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/react-hooks";

import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const BirthYear = ({ authors }) => {
  const [selected, setSelected] = useState(null);
  const [born, setBorn] = useState("");

  const options = [];
  authors.forEach(author => {
    options.push({
      value: author.name,
      label: author.name
    });
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const handleChange = selected => {
    setSelected(selected);
  };

  const submit = async e => {
    e.preventDefault();

    console.log("update birthyear");

    await editAuthor({
      variables: {
        name: selected.value,
        setBornTo: parseInt(born)
      }
    });

    setSelected("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <Select value={selected} onChange={handleChange} options={options} />

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
