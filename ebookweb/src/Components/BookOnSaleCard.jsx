import React from "react";
import { useNavigate } from "react-router-dom";

export const BookOnSaleCard = ({ img, name, tags, star, sale, price, book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/${book.id}`, { state: { book } });
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-[220px] p-2 cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="w-full h-64 overflow-hidden rounded-xl mb-3">
        <img
          src={img}
          alt={`Bìa sách ${name}`}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <h3 className="text-lg font-bold text-[#1E1B4B] mb-1 line-clamp-1">
        {name}
      </h3>

      <p className="text-sm text-orange-300 font-semibold uppercase tracking-wide mb-1">
        {(tags || []).join(", ") || "Không xác định"}
      </p>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-orange-400 font-semibold text-sm">
          <span>⭐</span>
          <span>{star}</span>
        </div>

        <div className="flex items-end gap-1 ml-auto">
          <span className="text-[16px] font-bold text-[#1E1B4B]">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(sale)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)}
          </span>
        </div>
      </div>
    </div>
  );
};
