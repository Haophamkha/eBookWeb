import React from "react";

export const BookSaleCard = ({ img, name, category, description, sale, price }) => {
  const truncatedDesc = description.length > 120 ? description.slice(0, 120) + "..." : description;

  return (
    <div className="rounded-xl w-full mx-auto shadow-md flex flex-col bg-white hover:shadow-lg transition-all duration-300 h-[550px] max-w-[400px]">
      {/* Hình ảnh*/}
      <div className="h-64 overflow-hidden rounded-t-xl">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* card */}
      <div className="flex flex-col justify-between p-6 flex-grow">
        <div>
          {/* Tên sách */}
          <h3 className="text-2xl font-bold text-blue-900 mb-2 line-clamp-1">{name}</h3>

          {/* Thể loại */}
          <div className="flex flex-wrap gap-2 mb-3">
            {category.slice(0, 3).map((cat, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-xs font-medium text-blue-900 px-2 py-1 rounded-md"
              >
                {cat.toUpperCase()}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {truncatedDesc}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
  <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 text-lg rounded-md font-semibold flex items-center gap-2">
    🛒 Add To Cart
  </button>

  <div className="flex items-end gap-1 text-left mr-7">
    <span className="text-2xl text-blue-900 font-bold mr-3">
      ${String(sale).replace('.', ',')}
    </span>
    <span className="text-xl text-gray-400 line-through font-bold">
      ${String(price).replace('.', ',')}
    </span>
  </div>
</div>

      </div>
    </div>
  );
};
