import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { ALL_AUTHORS } from "../queries";
import EditAuthor from "./EditAuthor";

const Authors = props => {
  const { loading, data } = useQuery(ALL_AUTHORS);
  const authors = data.allAuthors;

  if (!props.show) {
    return null;
  } else if (loading) {
    return <p>loading</p>;
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {props.token != null ? (
        <EditAuthor authors={authors}></EditAuthor>
      ) : (
        <p> Log in to edit authors. </p>
      )}
    </div>
  );
};

export default Authors;
