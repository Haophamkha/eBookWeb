import React from "react";
import { CustomButton, handleAddToCart } from "./UIElements";
import { useNavigate } from "react-router-dom";
export const BookSaleCard = ({ img, name, tags, descp, sale, price,book }) => {
  const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/shop/${book.id}`, { state: { book } });
    };
  const truncatedDesc =
    descp && typeof descp === "string" && descp.length > 120
      ? descp.slice(0, 120) + "..."
      : descp || "Không có mô tả";

  const fallbackImg = "https://via.placeholder.com/400x600.png?text=Bìa+Sách";

  return (
    <div onClick={handleClick} className="rounded-xl w-full mx-auto shadow-md flex flex-col bg-white hover:shadow-lg transition-all duration-300 h-[550px] max-w-[400px]">
      <div className="h-64 overflow-hidden rounded-t-xl">
        <img
          src={img || fallbackImg}
          alt={`Bìa sách ${name || "Không xác định"}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = fallbackImg;
          }}
        />
      </div>

      <div className="flex flex-col justify-between p-6 flex-grow">
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-2 line-clamp-1">
            {name || "Không xác định"}
          </h3>

          <div className="flex flex-wrap gap-2 mb-3">
            {(tags || []).slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-xs font-medium text-blue-900 px-2 py-1 rounded-md"
              >
                {tag.toUpperCase()}
              </span>
            ))}
            {(tags || []).length === 0 && (
              <span className="bg-gray-100 text-xs font-medium text-blue-900 px-2 py-1 rounded-md">
                KHÔNG XÁC ĐỊNH
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {truncatedDesc}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex-1">
            <CustomButton onClick={()=> handleAddToCart(book)}/>
          </div>

          <div className="flex flex-col items-end justify-center">
            <div className="flex items-center gap-2 pb-2">
              <span className="text-xl text-blue-900 font-bold ">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(sale)}
              </span>
              <span className="text-sm text-gray-400 line-through font-bold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
