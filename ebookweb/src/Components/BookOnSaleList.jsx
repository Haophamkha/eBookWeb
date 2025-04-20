import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { BookOnSaleCard } from "../Components/BookOnSaleCard";
import { getBooks } from "../Utils/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Mũi tên trái
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

// Mũi tên phải
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

export const BookOnSaleList = () => {
  const sliderRef = useRef(null);
  const [books, setBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBooks();
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
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
    autoplaySpeed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: true,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  const totalDots = Math.ceil(books.length / settings.slidesToScroll);

  return (
    <div className="my-14 px-4 max-w-7xl mx-auto">
      {/* Header: Tiêu đề bên trái, dots + arrow bên phải */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl font-bold text-blue-900">Books on Sale</h2>

        <div className="flex items-center space-x-4">
          <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />

          {/* Dots giữa 2 mũi tên */}
          <div className="flex space-x-2">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => sliderRef.current?.slickGoTo(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === i ? "bg-orange-400" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <NextArrow onClick={() => sliderRef.current?.slickNext()} />
        </div>
      </div>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {books.map((book, idx) => (
          <div key={idx} className="flex justify-center px-3">
            <BookOnSaleCard {...book} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
