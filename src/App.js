import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage.js";
import ArtistDetailPage from "./pages/ArtistDetailPage/ArtistDetailPage.js";
import Artists from "./pages/Artists";
import Home from "./pages/Home/Home";

import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} component={Home} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MovieDetailPage />} />
        <Route path="/Artists" element={<Artists />} />
        <Route path="/Artists/:id" element={<ArtistDetailPage />} />
      </Routes>
    </>
  );
}
