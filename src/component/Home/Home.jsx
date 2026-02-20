import React from "react";
import Banner from "../Banner/Banner";
import Footer from "../../pages/shared/Footer/Footer";
import Navbar from "../../pages/shared/NavBar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner></Banner>
      <Footer />
    </div>
  );
};

export default Home;
