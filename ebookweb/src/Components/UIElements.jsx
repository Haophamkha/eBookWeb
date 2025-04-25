import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 rounded-full bg-orange-300 hover:bg-orange-400 flex items-center justify-center"
  >
    <IoIosArrowBack className="text-white text-xl" />
  </button>
);

export const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 rounded-full bg-orange-300 hover:bg-orange-400 flex items-center justify-center"
  >
    <IoIosArrowForward className="text-white text-xl" />
  </button>
);

export const CustomButton = ({
  width = "auto",
  label = "Add to Cart",
  icon = true,
  to = null,
  onClick,
  bgColor = "#eaa451",
  className = "",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); 
    }
    if (to) {
      navigate(to);
    }
  };

  return (
    <>
      <style>
        {`
          .custom-button {
            position: relative;
            overflow: hidden;
            z-index: 0;
            transition: background-color 0.3s ease;
          }

          .custom-button::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.15);
            transition: left 1s ease;
            z-index: 1;
            pointer-events: none;
          }

          .custom-button:hover::before {
            left: 100%;
          }

          .icon-wrapper {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .custom-button:hover .icon-wrapper {
            animation: flyInside 0.8s ease-in-out;
          }

          @keyframes flyInside {
            0% { transform: translateY(0); opacity: 1; }
            40% { transform: translateY(-100%); opacity: 0; }
            60% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      <button
        onClick={handleClick}
        className={`custom-button group mb-4 flex items-center gap-2 px-5 py-2 text-base text-white rounded-md shadow transition ${className}`}
        style={{
          width,
          backgroundColor: bgColor,
        }}
      >
        {icon && (
          <span className="icon-wrapper">
            <FaShoppingCart className="w-5 h-5" />
          </span>
        )}
        <span className="z-10">{label}</span>
      </button>
    </>
  );
};

CustomButton.propTypes = {
  width: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};

export const BuyNowButton = () => {
  return (
    <>
      <style>
        {`
          .buy-now-btn {
            position: relative;
            overflow: hidden;
            background-color: #f0a64f;
            color: white;
            transition: background-color 0.3s ease;
          }

          .buy-now-btn::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: left 0.7s ease;
            z-index: 1;
            pointer-events: none;
          }

          .buy-now-btn:hover::before {
            left: 100%;
          }

          .buy-now-btn span {
            position: relative;
            z-index: 2;
          }
        `}
      </style>

      <button className="buy-now-btn px-5 py-2.5 text-base rounded-lg">
        <span>Buy Now</span>
      </button>
    </>
  );
};

export const SeeDetailsButton = () => {
  return (
    <>
      <style>
        {`
          .see-details-btn {
            position: relative;
            overflow: hidden;
            border: 1.5px solid #1e1b4b;
            background-color: transparent;
            color: #1e1b4b;
            transition: all 0.3s ease;
          }

          .see-details-btn::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: #1a1668;
            transition: left 0.7s ease;
            z-index: 1;
            pointer-events: none;
          }

          .see-details-btn:hover::before {
            left: 100%;
          }

          .see-details-btn span {
            position: relative;
            z-index: 2;
          }

          .see-details-btn:hover {
            background-color: #1a1668;
            color: white;
          }
        `}
      </style>

      <button className="see-details-btn px-5 py-2.5 font-semibold rounded-lg">
        <span>See Details</span>
      </button>
    </>
  );
};

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 80;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-400 text-white p-4 rounded-full shadow-lg hover:bg-orange-500 transition"
          style={{
            border: "2px dashed #f6c28b",
          }}
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};




