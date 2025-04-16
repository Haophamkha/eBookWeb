import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Slider from "react-slick";
import {getReviews} from "../Utils/api"; 

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getReviews()
      .then((res) => {
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setReviews(shuffled.slice(0, 5));
      })
      .catch((err) => {
        console.error("Lỗi khi lấy review:", err);
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
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={review.id}>
            <ReviewCard
              name={review.name}
              avatar={review.avatar}
              comment={review.comment}
              stars={review.stars}
              isHighlighted={index === activeIndex}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
