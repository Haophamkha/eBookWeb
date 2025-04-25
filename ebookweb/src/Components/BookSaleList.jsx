import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { BookSaleCard } from "./BookSaleCard";
import { getBooks } from "../Utils/api";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "./UIElements";

const MotionDiv = motion.div;

export const BookSaleList = () => {
  const sliderRef = useRef(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBooks();
        console.log("Dữ liệu sách từ API:", res.data);
        setBooks(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
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
        {books.map((book) => (
          <MotionDiv
            key={book.id}
            className="flex justify-center px-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: book.id * 0.2 }}
          >
            <BookSaleCard
              img={book.img}
              name={book.name}
              tags={book.tags}
              descp={book.descp}
              sale={book.sale}
              price={book.price}
            />
          </MotionDiv>
        ))}
      </Slider>
    </div>
  );
};