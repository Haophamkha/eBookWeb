import React, { useState, useEffect } from "react";
import { BookMiniCard } from "./BookMiniCard";
import { BuyNowButton } from "./UIElements";

export const BookCarousel = ({ books }) => {
  const initialIndex = books.findIndex((book) => book.name === "Vùng đất linh hồn");
  const [currentIndex, setCurrentIndex] = useState(initialIndex !== -1 ? initialIndex : 0);
  const [label, setLabel] = useState("Best Seller");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (books.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % books.length;
          setLabel(newIndex === 0 ? "Best Seller" : "Best Management");
          return newIndex;
        });
        setFade(true); // 👈 Bật opacity lại
      }, 500); // Thời gian fade-out
    }, 3000);
    return () => clearInterval(interval);
  }, [books]);

  if (books.length === 0) return <div>Đang tải...</div>;

  const currentBook = books[currentIndex];
  const price = parseFloat(currentBook.price);
  const sale = parseFloat(currentBook.sale);
  const discount = Math.round(((price - sale) / price) * 100) + "% GIẢM";

  const displayedBooks = [
    books[(currentIndex - 1 + books.length) % books.length],
    books[currentIndex],
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
        <div className="md:w-1/2 text-white flex flex-col justify-between h-full min-h-[450px] pr-24 pl-16">
          <h1 className="text-base font-medium tracking-[0.3em] uppercase mb-4 text-gray-300">
            {label.split("").join(" ")}
          </h1>
          <h2 className="text-6xl font-bold mb-4">{currentBook.name}</h2>
          <p className="text-xl font-semibold text-yellow-100 mb-1">
            {currentBook.author}
            <span className="text-base text-yellow-100 font-normal ml-2">
              {currentBook.tags[0] || "Không xác định"}
            </span>
          </p>
          <p className="text-gray-300 text-base max-w-lg mb-6 relative pl-4 before:content-['|'] before:absolute before:left-0 before:top-0 before:text-yellow-100 before:text-2xl">
            {currentBook.descp}
          </p>
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-yellow-400 mr-4">
              ${(sale / 1000).toFixed(2)}
            </span>
            <span className="text-base text-gray-500 line-through mr-4">
              ${(price / 1000).toFixed(2)}
            </span>
            <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {discount}
            </span>
          </div>
          <div className="flex space-x-4 mb-6">
            <BuyNowButton />
            <button className="border border-white hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded transition">
              Xem Chi Tiết
            </button>
          </div>
          <div className="mt-auto pt-30 text-white text-sm flex flex-col items-start">
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
            src={
              currentBook.author_avt ||
              "https://via.placeholder.com/400x600.png?text=Hình+Tác+Giả"
            }
            alt="Tác giả"
            className={`absolute bottom-0 right-0 h-full w-auto max-h-[700px] object-contain z-10 transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x600.png?text=Hình+Tác+Giả";
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
