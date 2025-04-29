import React, { useState, useEffect, useMemo } from "react";
import { BookMiniCard } from "./BookMiniCard";
import { BuyNowButton, handleAddToCart } from "./UIElements";
import { useNavigate } from "react-router-dom";

export const BookCarousel = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  const bannerImages = [
    "/CarouselImg/banner-media.png",
    "/CarouselImg/banner-media2.png",
    "/CarouselImg/banner-media3.png",
    "/CarouselImg/banner-media4.png",
    "/CarouselImg/banner-media5.png",
  ];

  const randomBooks = useMemo(() => {
    if (books.length === 0) return [];
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    const selectedBooks = shuffled.slice(0, Math.min(5, books.length));
    return selectedBooks.map((book, index) => ({
      ...book,
      bannerImage: bannerImages[index % bannerImages.length],
    }));
  }, [books]);

  // Auto-slide effect
  useEffect(() => {
    if (randomBooks.length <= 1) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % randomBooks.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [randomBooks.length]);

  const handleAddToCartWithLoading = async (book) => {
    setIsAddingToCart(true);
    try {
      await handleAddToCart(book);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle view full description
  const handleViewFullDesc = (book) => {
    navigate(`/shop/${book.id}`, { state: { book } });
  };

  if (randomBooks.length === 0) return <div className="text-center text-white py-10">Đang tải...</div>;

  const currentBook = randomBooks[currentIndex];
  const price = parseFloat(currentBook.price || 0);
  const sale = parseFloat(currentBook.sale || price);
  const discount = price > sale ? Math.round(((price - sale) / price) * 100) + "% GIẢM" : "";

  const maxDescLength = 200;
  const isDescLong = currentBook.descp?.length > maxDescLength;
  const shortDesc = isDescLong
    ? currentBook.descp.slice(0, maxDescLength) + "..."
    : currentBook.descp || "Không có mô tả";

  const displayedBooks = [
    randomBooks[(currentIndex - 1 + randomBooks.length) % randomBooks.length],
    randomBooks[currentIndex],
  ];

  return (
    <div
      className="relative min-h-[700px] overflow-hidden"
      style={{
        backgroundColor: "#080444",
        backgroundImage: `url('/waveelement.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-8 h-full">
        {/* LEFT SIDE */}
        <div className="md:w-1/2 text-white flex flex-col h-full min-h-[450px] pr-24 pl-16">
          <div className="flex-1 flex flex-col">
            <h2 className="text-6xl font-bold mb-4">{currentBook.name || "Không có tiêu đề"}</h2>
            <p className="text-xl font-semibold text-yellow-100 mb-4">
              {currentBook.author || "Tác giả không xác định"}
              <span className="text-base text-yellow-100 font-normal ml-10">
                {currentBook.tags?.[0] || "Không xác định"}
              </span>
            </p>
            <div className="max-w-lg mb-6 min-h-[120px] flex items-start">
              <p
                className="border-l-2 pl-4 border-yellow-100 text-gray-300 text-base leading-relaxed inline-block cursor-pointer"
                onClick={() => isDescLong && handleViewFullDesc(currentBook)}
              >
                {shortDesc}
                {isDescLong && (
                  <span className="text-yellow-300 hover:underline ml-1">xem thêm</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-yellow-400 mr-4">
              {sale.toLocaleString()} VNĐ
            </span>
            {price > sale && (
              <>
                <span className="text-base text-gray-500 line-through mr-4">
                  {price.toLocaleString()} VNĐ
                </span>
                <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {discount}
                </span>
              </>
            )}
          </div>
          <div className="flex space-x-4 mb-6">
            <BuyNowButton
              onClick={() => handleAddToCartWithLoading(currentBook)}
              disabled={isAddingToCart}
            />
            <button
              className="border border-white hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => navigate(`/shop/${currentBook.id}`, { state: { book: currentBook } })}
              disabled={isAddingToCart}
            >
              Xem Chi Tiết
            </button>
          </div>
          <div className="mt-auto pt-8 text-white text-sm flex flex-col items-start">
            <span className="uppercase font-medium mb-4">Đối tác của chúng tôi</span>
            <div className="flex items-center space-x-14">
              <img
                src="/partner-1.png"
                alt="Đối tác 1"
                className="h-6 object-contain opacity-80 hover:opacity-100 transition"
              />
              <img
                src="/partner-2.png"
                alt="Đối tác 2"
                className="h-6 object-contain opacity-80 hover:opacity-100 transition"
              />
              <img
                src="/partner-3.png"
                alt="Đối tác 3"
                className="h-6 object-contain opacity-80 hover:opacity-100 transition"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 relative h-[700px] flex justify-center items-end">
          <img
            src={currentBook.bannerImage}
            alt="Banner sách"
            className={`absolute bottom-0 right-0 h-full w-auto max-h-[700px] object-contain z-10 transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x600.png?text=Banner+Sách";
            }}
          />
          <div className="flex space-x-4 absolute bottom-8 right-12 z-20 bg-opacity-50 p-4 rounded-lg">
            {displayedBooks.map((book, idx) => (
              <BookMiniCard key={`${book.id}-${idx}`} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};