import React from "react";

export const BookOnSaleCard = ({ img, name, tags, star, sale, price }) => {
  const salePrice = parseFloat(sale) / 1000; 
  const originalPrice = parseFloat(price) / 1000; 

  return (
    <div className="w-full max-w-[220px] p-2">
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
            ${salePrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};