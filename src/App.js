
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies";
import Artists from "./pages/Artists";
import Home from "./pages/Home";

import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Artists" element={<Artists />} />
      </Routes>
    </>
  );
}
