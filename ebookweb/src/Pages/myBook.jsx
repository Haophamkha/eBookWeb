import React, { useEffect, useState } from "react";
import { Star, BookOpen } from "lucide-react";  // Đổi ShoppingCart thành BookOpen
import { Link } from "react-router-dom";

const MyBook = () => {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("myBook")) || [];
    setMyBooks(storedBooks);
  }, []);

  return (
    <div className="w-[80%] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Bộ sưu tập </h2>
      <button onClick={() => {
          if (window.confirm("Bạn có chắc muốn xóa toàn bộ sách không?")) {
            localStorage.removeItem("myBook");
            alert("Đã xóa toàn bộ sách trong Bộ Sưu Tập!");
            window.location.reload(); 
          }
        }}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 mb-2 rounded-lg" >
        Xóa toàn bộ 
      </button>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {myBooks.length > 0 ? (
          myBooks.map((item, index) => (
            <Link
              to={`/shop/${item.id}`}
              state={{ book: item }}
              key={index}
              className="h-90 group-hover:h-100 bg-white shadow border rounded-xl overflow-hidden transition-all transform hover:scale-105 group relative"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-60 w-full object-contain"
              />
              <div className="p-3 space-y-1 text-center">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <div className="group-hover:opacity-0">
                  <p className="text-xs text-gray-500">{item.author}</p>
                  <div className="flex justify-center items-center gap-1 text-yellow-500 text-sm">
                    <Star fill="currentColor" className="w-4 h-4" />
                    <span className="text-gray-700">{item.star}</span>
                  </div>
                </div>
              </div>

              {/* Đổi nút thành "Đọc sách" */}
              <button className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 text-sm rounded shadow transition-all duration-300 w-[80%] flex items-center justify-center gap-2">
                <BookOpen size={16} />
                <p>Đọc sách</p>
              </button>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            Chưa có sách nào trong bộ sưu tập
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBook;
