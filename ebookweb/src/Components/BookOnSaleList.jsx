import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { BookOnSaleCard } from "../Components/BookOnSaleCard";
import { getBooks } from "../Utils/api";
import { PrevArrow, NextArrow } from "./UIElements";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MotionDiv = motion.div; 

export const BookOnSaleList = () => {
  const sliderRef = useRef(null);
  const [books, setBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBooks();
        // Lọc sale có giá trị
        const filteredBooks = res.data.filter(
          (book) => book.sale !== undefined && book.sale !== null && book.sale !== ""
        );
        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl font-bold text-blue-900">Sách đang giảm giá</h2>

        <div className="flex items-center space-x-4">
          <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />

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

      <Slider ref={sliderRef} {...settings}>
        {books.map((book, idx) => (
          <MotionDiv
          key={idx}
          className="flex justify-center px-3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <BookOnSaleCard {...book} book={book} />
        </MotionDiv>
        
        ))}
      </Slider>
    </div>
  );
};