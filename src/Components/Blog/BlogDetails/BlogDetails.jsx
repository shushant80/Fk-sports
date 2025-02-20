import React from "react";
import "./BlogDetails.css";

import blogdetail1 from "../../../Assets/Blog/blogDetail1.jpg";
import blogimage1 from "../../../Assets/Blog/blogDetail2.jpg";
import blogimage2 from "../../../Assets/Blog/blogDetail3.jpg";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const BlogDetails = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="blogDetailsSection">
      <div className="blogDetailsSectionContainer">
        {/* Blog Heading */}
        <div className="blogDetailsHeading">
          <h2>5 Tips to Increase Your Online Sales</h2>
          <div className="blogDetailsMetaData">
            <span>by admin</span>
            <span>May 19, 2023</span>
            <span>Trends</span>
          </div>
        </div>

        {/* Main Blog Image */}
        <div className="blogDetailsFeaturedImg">
          <img src={blogdetail1} alt="Featured" />
        </div>

        {/* ✅ Blog Content - Text on Left, Images on Right */}
        <div className="blogDetailsContentContainer">
          {/* ✅ Left Side (Text) */}
          <div className="blogDetailsText">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
              sapien dignissim a elementum. Sociis metus, hendrerit mauris id
              in. Quis sit sit ultrices tincidunt euismod luctus diam...
            </p>
            <h5>Sed do eiusmod tempor incididunt ut labore</h5>
            <p>
              Saw wherein fruitful good days image them, midst, waters upon,
              saw. Seas lights seasons. Fourth hath rule Evening...
            </p>

            <div className="blogDetailsContentBullets">
              <div className="blogDetailsContentBulletscontent">
                <h5>Why choose this product?</h5>
                <ul>
                  <li>Made from high-quality cotton fabric</li>
                  <li>Available in multiple sizes and colors</li>
                  <li>Perfect for daily use and comfortable wear</li>
                </ul>
              </div>
              <div className="blogDetailsContentBulletscontent">
                <h5>Sample Number List</h5>
                <ol>
                  <li>Soft and smooth texture</li>
                  <li>Highly durable material</li>
                  <li>Easy to wash and maintain</li>
                </ol>
              </div>
            </div>

            <p>
              She'd years darkness days. A night fifth winged sixth divide meat
              said third them forth signs of life earth signs over fruitful...
            </p>
          </div>

          {/* ✅ Right Side (Images) */}
          <div className="blogDetailsContentImg">
            <img src={blogimage1} alt="Blog Detail 1" />
            <img src={blogimage2} alt="Blog Detail 2" />
          </div>
        </div>

        {/* Additional Blog Content */}
        <div className="blogDetailsContent">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
            sapien dignissim a elementum. Sociis metus, hendrerit mauris id
            in...
          </p>
          <p>
            She'd years darkness days. A night fifth winged sixth divide meat
            said third them forth signs of life earth signs...
          </p>
        </div>

        {/* Share Buttons */}
        <div className="share-buttons">
          <button className="share-button facebook">
            <FaFacebookF /> Share on Facebook
          </button>
          <button className="share-button twitter">
            <FaXTwitter /> Share on Twitter
          </button>
          <button className="share-button pinterest">
            <FaPinterest /> Share on Pinterest
          </button>
          <button className="share-button more">
            <FaPlus size={20} />
          </button>
        </div>

        {/* Navigation for Next/Previous Posts */}
        <div className="blogDetailsNextPrev">
          <div className="blogDetailsNextPrevContainer">
            <div
              className="blogDetailsNextPrevContainerIcon"
              onClick={scrollToTop}
            >
              <GoChevronLeft size={20} />
              <p>PREVIOUS POST</p>
            </div>
            <p>Given Set was without from god divide rule Hath</p>
          </div>
          <div className="blogDetailsNextPrevContainer">
            <div
              className="blogDetailsNextPrevContainerIcon2"
              onClick={scrollToTop}
            >
              <p>NEXT POST</p>
              <GoChevronRight size={20} />
            </div>
            <p style={{ textAlign: "right" }}>
              Tree earth fowl given moveth deep lesser after
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
