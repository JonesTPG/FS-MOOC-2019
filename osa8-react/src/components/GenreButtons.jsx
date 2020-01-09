import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { ALL_GENRES } from "../queries";

const GenreButtons = ({ setGenre }) => {
  const { data, loading, refetch } = useQuery(ALL_GENRES);

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <>
      {data.allGenres.map(genre => (
        <button key={genre} onClick={setGenre(genre, refetch)}>
          {genre}
        </button>
      ))}
      <button onClick={setGenre("", refetch)}>all genres</button>
    </>
  );
};

export default GenreButtons;
