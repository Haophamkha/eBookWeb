import React from "react";
import { BuyNowButton, SeeDetailsButton } from "./UIElements";

export const FeaturedProductCard = ({ img, name, tags, descp, price, sale }) => {
  const salePrice = parseFloat(sale) / 1000; 
  const originalPrice = parseFloat(price) / 1000;
  const discountPercent = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

  return (
    <div className="flex flex-col md:flex-row items-start bg-gray-100 rounded-2xl p-10 max-w-7xl mx-auto min-h-[520px]">
      <img
        src={img}
        alt={`Bìa sách ${name}`}
        className="w-80 h-[500px] object-cover rounded-xl shadow-md"
      />

      <div className="flex flex-col justify-between md:ml-12 mt-6 md:mt-0 flex-1 h-[500px] w-full">
        <div>
          <div className="tracking-[1em] text-blue-900 font-semibold text-lg mb-4">
            BÁN CHẠY NHẤT
          </div>

          <h3 className="text-5xl font-extrabold text-blue-900 mb-4">{name}</h3>

          <div className="flex flex-wrap gap-3 mb-5">
            {(tags || []).map((tag, idx) => (
              <span key={idx} className="text-blue-900 text-base font-medium">
                {tag}
              </span>
            ))}
            {(tags || []).length === 0 && (
              <span className="text-blue-900 text-base font-medium">
                Không xác định
              </span>
            )}
          </div>

          <div className="border-l-2 pl-4 border-gray-300 text-gray-700 text-lg leading-relaxed mb-6">
            {descp}
          </div>
        </div>

        <div className="mt-auto flex flex-col">
          <div className="flex items-center flex-wrap gap-6 text-blue-900 mb-6">
            <span className="text-5xl font-bold">${salePrice.toFixed(2)}</span>
            <span className="text-orange-500 line-through text-xl font-medium">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="bg-gray-100 text-base font-semibold px-3 py-1 rounded text-gray-800">
              {discountPercent}% GIẢM
            </span>
          </div>

          <div className="flex flex-wrap gap-4 py-4">
            <BuyNowButton />
            <SeeDetailsButton />
          </div>
        </div>
      </div>
    </div>
  );
};