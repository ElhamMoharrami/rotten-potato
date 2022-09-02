import React from "react";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import ArtistCard from "../components/ArtistCard/ArtistCard";

const MovieDetailPage = () => {
  const card = (item) => {
    return <ArtistCard artist={item} key={item.id} />;
  };

  return <MovieDetail card={card} />;
};

export default MovieDetailPage;
