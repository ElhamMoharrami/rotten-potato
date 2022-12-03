import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import cinema from "../assets/images/cinema-equipment-table.jpg";

const myStyle = {
  backgroundImage: `url(${cinema})`,
  height: "100vh",
  marginTop: "-70px",
  fontSize: "50px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Home = () => {
  return (
    <Box>
      <Box style={myStyle}></Box>
    </Box>
  );
};

export default Home;