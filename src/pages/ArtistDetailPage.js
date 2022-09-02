import React from "react";
import ArtistDetail from "../components/ArtistDetail/ArtistDetail";
import MovieCard from '../components/MovieCard/MovieCard'

const ArtistDetailPage = () => {

  const card=(item)=>{
    return <MovieCard movie={item}/>;
  }

  return <ArtistDetail card={card} />;
};

export default ArtistDetailPage
