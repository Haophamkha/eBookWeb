import React, { useState, useEffect } from "react";
import { BookMiniCard } from "./BookMiniCard";

export const BookCarousel = ({ books }) => {
  const initialIndex = books.findIndex(book => book.name === "Vùng đất linh hồn");
  const [currentIndex, setCurrentIndex] = useState(initialIndex !== -1 ? initialIndex : 0);
  const [label, setLabel] = useState("Best Seller");

  useEffect(() => {
    if (books.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % books.length;
        setLabel(newIndex === 0 ? "Best Seller" : "Best Management");
        return newIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [books]);

  if (books.length === 0) return <div>Loading...</div>;

  const currentBook = books[currentIndex];
  const discount =
    Math.round(
      ((currentBook.price - currentBook.sale) / currentBook.price) * 100
    ) + "% OFF";

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
            {currentBook.author}{" "}
            <span className="text-base text-yellow-100 font-normal ml-2">
              {currentBook.genres[0]}
            </span>
          </p>
          <p className="text-gray-300 text-base max-w-lg mb-6 relative pl-4 before:content-['|'] before:absolute before:left-0 before:top-0 before:text-yellow-100 before:text-2xl">
            {currentBook.description}
          </p>
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-yellow-400 mr-4">
              ${currentBook.sale}
            </span>
            <span className="text-base text-gray-500 line-through mr-4">
              ${currentBook.price}
            </span>
            <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {discount}
            </span>
          </div>
          <div className="flex space-x-4 mb-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded transition">
              Buy Now
            </button>
            <button className="border border-white hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded transition">
              See Details
            </button>
          </div>
          {/* Partner logos */}
          <div className="flex items-center space-x-6 text-white text-sm">
            <span className="uppercase font-medium">Our partner</span>
            <span className="text-gray-400 flex items-center">
              <span className="mr-2">○</span> Highlow
            </span>
            <span>emajine</span>
            <span>GlowUP</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 relative h-[700px] flex justify-center items-end">
          <img
            src={
              currentBook.imgAuthor ||
              "https://via.placeholder.com/400x600.png?text=Author+Image"
            }
            alt="Author"
            className="absolute bottom-0 right-0 h-full w-auto max-h-[700px] object-contain z-10 transition-all duration-500"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x600.png?text=Author+Image";
            }}
          />
          {/* BookMiniCards */}
          <div className="flex space-x-4 absolute bottom-8 right-12 z-20 bg-opacity-50 backdrop-blur-md p-4 rounded-lg">
            {displayedBooks.map((book, idx) => (
              <BookMiniCard key={`${book.id}-${idx}`} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};