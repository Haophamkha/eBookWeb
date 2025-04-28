import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { RecommendedBookCard } from "./RecommendedBookCard";
import { getBooks } from "../Utils/api";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MotionDiv = motion.div;

export const RecommendedBookList = () => {
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
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-gray-100 py-32">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-blue-900">Gợi ý cho bạn</h2>
          <p className="text-xl text-gray-500 mt-2">
            Khám phá những cuốn sách được tuyển chọn riêng dành cho bạn, phù hợp
            với sở thích đọc và hành trình tri thức của bạn. Đừng bỏ lỡ những
            tác phẩm đặc sắc đang chờ bạn khám phá!
          </p>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {books.map((book, idx) => (
            <MotionDiv
              key={idx}
              className="px-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
            >
              <RecommendedBookCard
                img={book.img}
                name={book.name}
                price={book.sale}
              />
            </MotionDiv>
          ))}
        </Slider>
      </div>
    </div>
  );
};
