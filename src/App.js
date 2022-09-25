import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import ArtistDetail from "./pages/ArtistDetail/ArtistDetail";
import Artists from "./pages/Artists";
import Home from "./pages/Home/Home";
import MovieForm from "./components/MovieForm/MovieForm";
import CrewForm from "./components/CrewForm/CrewForm";

import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} component={Home} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/:id" element={<ArtistDetail />} />
        <Route path="/movie/form/add" element={<MovieForm />} />
        <Route path="/movie/form/edit/:id" element={<MovieForm />} />
        <Route path="/crew/form/add" element={<CrewForm />} />
        <Route path="/crew/form/edit/:id" element={<CrewForm />} />
      </Routes>
    </>
  );
}
