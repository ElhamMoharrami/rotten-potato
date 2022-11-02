import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import CrewsDetail from "./pages/CrewsDetail/CrewsDetail";
import Crews from "./pages/Crews";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} component={Home} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/crews" element={<Crews />} />
        <Route path="/crews/:id" element={<CrewsDetail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
