import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import { useLazyQuery } from "@apollo/client";

import { BOOKS_BY_GENRE } from "../queries";

const Recommend = ({ token, show, genre }) => {
  const { data, loading } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genre }
  });

  if (!show) {
    return null;
  } else if (loading) return <p>Loading ...</p>;
  else {
    return <p> shittiä </p>;
  }
};

export default Recommend;
