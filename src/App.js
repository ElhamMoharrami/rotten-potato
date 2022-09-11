import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import ArtistDetail from "./pages/ArtistDetail/ArtistDetail";
import Artists from "./pages/Artists";
import Home from "./pages/Home/Home";
import DataForm from "./components/DataForm/DataForm";

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
        <Route path="/DataForm/add" element={<DataForm/>}  />
        <Route path="/DataForm/:id" element={<DataForm/>}  />
      </Routes>
    </>
  );
}
