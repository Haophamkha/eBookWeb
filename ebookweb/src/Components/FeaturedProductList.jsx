import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { FeaturedProductCard } from "./FeaturedProductCard";
import { getBooks } from "../Utils/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { PrevArrow, NextArrow } from "./UIElements";

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
        console.error("Lỗi khi lấy danh sách sách nổi bật:", error);
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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-blue-900">Sản Phẩm Nổi Bật</h2>
          <p className="text-base text-gray-500 mt-3 max-w-2xl mx-auto">
            Khám phá những cuốn sách được yêu thích nhất, mang đến trải nghiệm đọc tuyệt vời với nội dung phong phú và hấp dẫn. Hãy chọn cho mình một cuốn sách phù hợp và bắt đầu hành trình tri thức ngay hôm nay!
          </p>
        </div>

        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {books.map((book) => {
            const prevBook = prevSlideIndex !== null ? books[prevSlideIndex] : null;
            const salePrice = parseFloat(book.sale) / 1000; // Chuyển chuỗi thành số và chia cho 1000
            const originalPrice = parseFloat(book.price) / 1000; // Chuyển chuỗi thành số và chia cho 1000

            return (
              <div key={book.id} className="relative min-h-[500px]">
                {prevBook && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] overflow-hidden opacity-30 pointer-events-none z-0">
                    <div className="translate-x-[60%] scale-90">
                      <FeaturedProductCard
                        img={prevBook.img}
                        name={prevBook.name}
                        tags={prevBook.tags}
                        descp={prevBook.descp}
                        price={parseFloat(prevBook.price) / 1000}
                        sale={parseFloat(prevBook.sale) / 1000}
                      />
                    </div>
                  </div>
                )}

                <div className="relative z-10 ml-[120px]">
                  <FeaturedProductCard
                    img={book.img}
                    name={book.name}
                    tags={book.tags}
                    descp={book.descp}
                    price={originalPrice}
                    sale={salePrice}
                  />
                </div>
              </div>
            );
          })}
        </Slider>

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