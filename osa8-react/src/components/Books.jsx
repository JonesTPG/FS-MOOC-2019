import React, { useState } from "react";

import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { useLazyQuery } from "@apollo/client";

import { ALL_BOOKS, ALL_GENRES, BOOKS_BY_GENRE } from "../queries";

const Books = props => {
  const client = useApolloClient();
  const { data, loading } = useQuery(ALL_BOOKS);
  const [genreBooks, setGenreBooks] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const books = data.allBooks;

  const { data: genreData, loading: genreLoading, refetch } = useQuery(
    ALL_GENRES
  );
  const [
    getSpesificGenre,
    { loading: spesificLoading, data: spesificData }
  ] = useLazyQuery(BOOKS_BY_GENRE, {
    client: client,
    onCompleted: data => {
      setGenreBooks(data.booksByGenre);
    }
  });

  const setGenre = genre => () => {
    refetch({ variables: { genre: genre } });
    setSelectedGenre(genre);
    getSpesificGenre({ variables: { genre: genre } });
  };

  if (!props.show) {
    return null;
  } else if (loading || genreLoading) {
    return <p>loading</p>;
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre == null ? (
        <h2>all books</h2>
      ) : (
        <h2>in genre {selectedGenre}</h2>
      )}
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>author</th>
            <th>published</th>
          </tr>

          {genreBooks != null && genreBooks.length > 0
            ? genreBooks.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>

      {genreData.allGenres.map(genre => (
        <button key={genre} onClick={setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
