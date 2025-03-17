import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const GymHeroSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="gymHeroMain">
      {/* <div className="sectionleft">
        <div className="gymHeroLink">
          <Link to="/shop" onClick={scrollToTop}>
            <button className="shopButton">Shop Now</button>
          </Link>
        </div>
      </div> */}

      <div className="sectionright">
        {/* Use the image from the public/Assets folder */}
        <img
          src={`${process.env.PUBLIC_URL}/Assets/for-web1.png`}
          alt="Gym Training"
          className="gymHeroImage"
          style={{ width: "100%", height: "600px", marginRight: "200px" }}  // Adjust the width and height here
        />
      </div>
    </div>
  );
};

export default GymHeroSection;