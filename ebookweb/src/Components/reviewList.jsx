import { useEffect, useState, useRef } from "react";
import ReviewCard from "./reviewCard";
import Slider from "react-slick";
import { getReviews } from "../Utils/api";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "./UIElements";

const MotionDiv = motion.div;

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    getReviews()
      .then((res) => {
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setReviews(shuffled.slice(0, 5));
      })
      .catch((err) => {
        console.error("Lỗi khi lấy đánh giá:", err);
      });
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: false,
    beforeChange: (oldIndex, newIndex) => {
      setActiveIndex(newIndex);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="my-14 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="max-w-[50%]">
          <h2 className="text-3xl font-bold text-blue-900">Đánh giá</h2>
          <p className="text-gray-500 text-base mt-2 break-words">
            Các bài đánh giá từ khách hàng của chúng tôi. Hãy xem những gì họ nói về sản phẩm của chúng tôi và cảm nhận sự khác biệt mà chúng tôi mang lại.
          </p>
        </div>
        <div className="flex space-x-2">
          <PrevArrow onClick={() => sliderRef.current.slickPrev()} />
          <NextArrow onClick={() => sliderRef.current.slickNext()} />
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {reviews.map((review, index) => (
          <MotionDiv
            key={review.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
          >
            <ReviewCard
              name={review.name}
              avatar={review.avatar}
              comment={review.comment}
              stars={review.stars}
              isHighlighted={index === activeIndex}
            />
          </MotionDiv>
        ))}
      </Slider>
    </div>
  );
}