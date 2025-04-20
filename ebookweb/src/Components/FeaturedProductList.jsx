import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { FeaturedProductCard } from "./FeaturedProductCard";
import { getBooks } from "../Utils/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 rounded-full bg-orange-300 hover:bg-orange-400 flex items-center justify-center"
  >
    <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 rounded-full bg-orange-300 hover:bg-orange-400 flex items-center justify-center"
  >
    <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

export const FeaturedProductList = () => {
  const sliderRef = useRef(null);
  const [books, setBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBooks();
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching featured books:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    beforeChange: (current, next) => {
      setPrevSlideIndex(current);
      setCurrentSlide(next);
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen py-1">
      <div className="my-32 px-4 max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-blue-900">Featured Product</h2>
          <p className="text-base text-gray-500 mt-3 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          </p>
        </div>

        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {books.map((book, idx) => {
            const prevBook = prevSlideIndex !== null ? books[prevSlideIndex] : null;

            return (
                <div key={idx} className="relative min-h-[500px]">
                {/* Card cũ - bên trái, chỉ hiển thị 1 phần bên phải */}
                {prevBook && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] overflow-hidden opacity-30 pointer-events-none z-0">
                    <div className="translate-x-[60%] scale-90">
                      <FeaturedProductCard
                        img={prevBook.img}
                        name={prevBook.name}
                        genres={prevBook.category}
                        description={prevBook.description}
                        price={prevBook.price}
                        sale={prevBook.sale}
                      />
                    </div>
                  </div>
                )}
              
                {/* Card hiện tại */}
                <div className="relative z-10 ml-[120px]">
                  <FeaturedProductCard
                    img={book.img}
                    name={book.name}
                    genres={book.category}
                    description={book.description}
                    price={book.price}
                    sale={book.sale}
                  />
                </div>
              </div>
              
            );
          })}
        </Slider>

        {/* Navigation */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
          <div className="flex space-x-2">
            <ul className="flex space-x-2">
              {Array.from({ length: books.length }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => sliderRef.current?.slickGoTo(index)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      currentSlide === index
                        ? "bg-yellow-400 scale-125"
                        : "bg-gray-100 opacity-75"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
          <NextArrow onClick={() => sliderRef.current?.slickNext()} />
        </div>
      </div>
    </div>
  );
};
