import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import CrewsDetail from "./pages/CrewsDetail/CrewsDetail";
import Crews from "./pages/Crews";
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
        <Route path="/artists" element={<Crews />} />
        <Route path="/artists/:id" element={<CrewsDetail />} />
        <Route path="/movies/add" element={<MovieForm />} />
        <Route path="/movies/edit/:id" element={<MovieForm />} />
        <Route path="/crews/add" element={<CrewForm />} />
        <Route path="/crews/edit/:id" element={<CrewForm />} />
      </Routes>
    </>
  );
}
