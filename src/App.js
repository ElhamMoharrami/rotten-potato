/* istanbul ignore file */
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import CrewsDetail from "./pages/CrewsDetail";
import Crews from "./pages/Crews";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Box from "@mui/material/Box";
import ToggleColorMode from "./components/Theme/Theme";

export default function App() {
  return (
    <ToggleColorMode>
      <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <NavBar />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/crews" element={<Crews />} />
          <Route path="/crews/:id" element={<CrewsDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </ToggleColorMode>
  );
}
