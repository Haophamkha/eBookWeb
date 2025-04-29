import React, { useEffect, useState } from "react";
import { Star, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomButton } from "../Components/UIElements";
import useUserStore from "../Components/useUserStore";
import { getPurchasedBooksFromAPI } from "../Utils/api";

const MyBook = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [error, setError] = useState(null);
  const { userId, isLoggedIn } = useUserStore((state) => state);

  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      if (!isLoggedIn || !userId) {
        alert("Vui lòng đăng nhập để xem bộ sưu tập sách!");
        return;
      }

      try {
        setError(null);
        const { data } = await getPurchasedBooksFromAPI(userId);
        console.log("Dữ liệu sách đã mua từ API:", data);
        if (data.length > 0) {
          setMyBooks(data);
        } else {
          setMyBooks([]);
          
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách đã mua:", error);
        setError("Không thể tải bộ sưu tập sách. Vui lòng thử lại.");
      }
    };

    if (userId && isLoggedIn) {
      fetchPurchasedBooks();
    }
  }, [userId, isLoggedIn]);

  return (
    <div className="w-[80%] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Bộ Sưu Tập Sách</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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
                  <p className="text-xs text-gray-500">{item.author || "Không rõ tác giả"}</p>
                  <div className="flex justify-center items-center gap-1 text-yellow-500 text-sm">
                    <Star fill="currentColor" className="w-4 h-4" />
                    <span className="text-gray-700">{item.star || "N/A"}</span>
                  </div>
                </div>
              </div>
              <CustomButton
                height="30px"
                width="180px"
                bgColor="oklch(58.5% 0.233 277.117)"
                icon={BookOpen}
                label="Đọc sách"
                className="absolute bottom-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white px-2 py-1 text-sm rounded shadow transition-all duration-300 w-[80%] flex items-center justify-center gap-2"
              />
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