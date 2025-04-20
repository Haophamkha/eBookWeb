import React from "react";

export const BookOnSaleCard = ({ img, name, category, rating, sale, price }) => {
  return (
    <div className="w-full max-w-[220px] p-2">
      {/* Hình ảnh */}
      <div className="w-full h-64 overflow-hidden rounded-xl mb-3">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Tên sách */}
      <h3 className="text-lg font-bold text-[#1E1B4B] mb-1 line-clamp-1">
        {name}
      </h3>

      {/* Thể loại */}
      <p className="text-sm text-orange-300 font-semibold uppercase tracking-wide mb-1">
        {category.join(", ")}
      </p>

      {/* Rating + Giá */}
      <div className="flex items-center gap-3">
        {/* Rating */}
        <div className="flex items-center gap-1 text-orange-400 font-semibold text-sm">
          <span>⭐</span>
          <span>{rating}</span>
        </div>

        {/* Giá */}
        <div className="flex items-end gap-1 ml-auto">
          <span className="text-[16px] font-bold text-[#1E1B4B]">
            ${sale}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
};
