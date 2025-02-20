import React from "react";
import "./AboutPage.css";

import about1 from "../../Assets/About/about-1.png";
import about2 from "../../Assets/About/about-1.jpg";

import Services from "../../Components/Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        {/* <h2>About Fk Sports</h2> */}
        <img src={about1} alt="" />
        <div className="aboutContent">
          <h3>Our Story</h3>
          <h4>
          FK Sports is a family-owned company and inspired by the belief that the best sports products should be accessible to everyone. We are one of the leading store, 
          based in Peterborough. We are an U.K. owned and operated business and have been selling a wide array of products.
          We offer you a wide range of unique and high quality sport products, sourced directly from top manufacturers and sold 
          to you at the lowest prices to ensure you get the best deal.
          </h4>
          <p>
          We think everyone should have access to high-quality, reasonably priced training tools so they can achieve their objectives.
          Our selection of equipment has been thoughtfully created to provide a fantastic option for all strength levels and financial constraints.
          We provide a selection of premium products at competitive prices. We have sourced the product directly 
          from manufacturers in order to lower the cost of the product.Our Boston, UK warehouse is where all of our products are shipped from.
          </p>
          <div className="content1">
            <div className="contentBox">
              <h5>Our Team</h5>
              <p>
              We take great pride in being a part of a great team that is dedicated to our purpose.
              Our customer service representatives are accessible seven days a week and are always delighted to assist you with any questions you may have.
              </p>
            </div>
            <div className="contentBox">
              <h5>Additional</h5>
              <p>
              To contact us, click here, or to learn more, see our FAQs. 
              If you're interested in joining the team, please get in touch with us as we frequently have new positions available due to our rapid growth.
              Don't forget to subscribe to our newsletter by clicking the link on the prescreen
              </p>
            </div>
          </div>
          <div className="content2">
            <div className="imgContent">
              <img src={about2} alt="" />
            </div>
            <div className="textContent">
              <h5>The Company</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                sapien dignissim a elementum. Sociis metus, hendrerit mauris id
                in. Quis sit sit ultrices tincidunt euismod luctus diam. Turpis
                sodales orci etiam phasellus lacus id leo. Amet turpis nunc,
                nulla massa est viverra interdum. Praesent auctor nulla morbi
                non posuere mattis. Arcu eu id maecenas cras.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <div className="companyPartners">
        <h5>Company Partners</h5>
        <Swiper
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },

            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand3} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand4} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand5} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand6} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand7} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default AboutPage;
