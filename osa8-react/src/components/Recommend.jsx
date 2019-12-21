import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";

import { BOOKS_BY_GENRE, USER_FAVORITE_GENRE } from "../queries";

const Recommend = ({ token, show, genre }) => {
  /* state variables for the favorite genre of the user and the books that relate to the genre.
       both of these values are fetched from the back-end via graphql usequery hook */
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [booksList, setBooksList] = useState(null);

  // fetch the favorite genre of the logged in user via a graphql query.
  const { data, loading } = useQuery(USER_FAVORITE_GENRE, {
    onCompleted: data => {
      if (data.me != null) {
        console.log("favorite genre set:" + data.me);
        setFavoriteGenre(data.me.favoriteGenre);
      }
    }
  });

  // skip the following query if the genre data has not yet loaded from the previous query
  const skip = favoriteGenre === null;

  // when the favorite genre is found out, fetch the books that belong to that genre
  const { data: booksData, loading: booksLoading } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: skip,
    onCompleted: data => {
      setBooksList(data.booksByGenre);
    }
  });

  if (!show) {
    return null;
  } else if (loading || booksLoading || booksList == null)
    return <p>Loading ...</p>;
  else {
    return (
      <>
        <h2>recommended books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksList.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default Recommend;
