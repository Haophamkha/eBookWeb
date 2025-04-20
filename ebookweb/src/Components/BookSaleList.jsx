import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { BookSaleCard } from "./BookSaleCard";
import { getBooks } from "../Utils/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 rounded-full bg-orange-300 hover:bg-orange-400 flex items-center justify-center mr-2"
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

export const BookSaleList = () => {
  const sliderRef = useRef(null);
  const [books, setBooks] = useState([]);

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
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="my-32 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-4xl font-bold text-blue-900">Ưu đãi đặc biệt</h2>
        <div className="flex space-x-2">
          <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
          <NextArrow onClick={() => sliderRef.current?.slickNext()} />
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {books.map((book, idx) => (
          <div key={idx} className="flex justify-center px-3">
            <BookSaleCard
              img={book.img}
              name={book.name}
              category={book.category}
              description={book.description}
              sale={book.sale}
              price={book.price}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
