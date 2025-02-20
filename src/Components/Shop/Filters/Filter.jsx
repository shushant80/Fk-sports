import React, { useState } from "react";
import "./Filter.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import Slider from "@mui/material/Slider";

const Filter = () => {
  const [value, setValue] = useState([20, 69]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const filterCategories = [
  //   "Treadmills",
  //   "Dumbbells",
  //   "GYM Mats",
  //   "Squats Rack",
  //   "GYM Plates",
  //   "Kids Mat",
  //   "Baby Swing",
  //   "Baby Bouncer",
  //   "Gym Cycle",
  //   "Trampoline",
  // ];

  // const handleCategoryClick = (category) => {
  //   setSelectedCategory((prevCategory) =>
  //     prevCategory === category ? null : category
  //   );
  // };

  // return (
  //   <div className="filterSection">
  //     {/* Product Categories */}
  //     <div className="filterCategories">
  //       <Accordion defaultExpanded disableGutters elevation={0}>
  //         <AccordionSummary
  //           expandIcon={<IoIosArrowDown size={20} />}
  //           aria-controls="panel1-content"
  //           id="panel1-header"
  //           sx={{ padding: 0, marginBottom: 2 }}
  //         >
  //           <h5 className="filterHeading">Product Categories</h5>
  //         </AccordionSummary>
  //         <AccordionDetails sx={{ padding: 0 }}>
  //           <div className="categoryBoxContainer">
  //             {filterCategories.map((category, index) => (
  //               <button
  //                 key={index}
  //                 className={`categoryBox ${
  //                   selectedCategory === category ? "selected" : ""
  //                 }`}
  //                 onClick={() => handleCategoryClick(category)}
  //               >
  //                 {category}
  //               </button>
  //             ))}
  //           </div>
  //         </AccordionDetails>
  //       </Accordion>
  //     </div>

  //     {/* Price Slider */}
  //     <div className="filterPrice">
  //       <Accordion defaultExpanded disableGutters elevation={0}>
  //         <AccordionSummary
  //           expandIcon={<IoIosArrowDown size={20} />}
  //           aria-controls="panel1-content"
  //           id="panel1-header"
  //           sx={{ padding: 0, marginBottom: 2 }}
  //         >
  //           <h5 className="filterHeading">Price</h5>
  //         </AccordionSummary>
  //         <AccordionDetails sx={{ padding: 0 }}>
  //           <Slider
  //             value={value}
  //             onChange={handleChange}
  //             valueLabelDisplay="auto"
  //             valueLabelFormat={(val) => `$${val}`}
  //             min={10}
  //             max={500}
  //             sx={{
  //               color: "black",
  //               "& .MuiSlider-thumb": {
  //                 backgroundColor: "white",
  //                 border: "2px solid black",
  //                 width: 18,
  //                 height: 18,
  //               },
  //             }}
  //           />

  //           <div className="filterSliderPrice">
  //             <div className="priceRange">
  //               <p>Min Price: <span>${value[0]}</span></p>
  //               <p>Max Price: <span>${value[1]}</span></p>
  //             </div>
  //           </div>
  //         </AccordionDetails>
  //       </Accordion>
  //     </div>
  //   </div>
  // );
};

export default Filter;
