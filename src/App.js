import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetailPage.js";
import ArtistDetail from "./components/ArtistDetail/ArtistDetail";
import Artists from "./pages/Artists";
import Home from "./pages/Home";

import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} component={Home} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MovieDetail />} />
        <Route path="/Artists" element={<Artists />} />
        <Route path="/Artists/:id" element={<ArtistDetail />} />
      </Routes>
    </>
  );
}
