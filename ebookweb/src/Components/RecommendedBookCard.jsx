import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import PropTypes from 'prop-types';

export const RecommendedBookCard = ({ img, name, price }) => {
  return (
    <div className="flex flex-col justify-between items-center bg-white rounded-lg shadow-md w-[200px] min-h-[380px]">
      {/* Book Cover */}
      <img
        src={img}
        alt={name}
        className="w-full h-72 object-cover rounded-lg"
      />

      {/* Book Info */}
      <div className="p-3 text-center w-full flex-1 flex flex-col justify-between">
        <h3
          className="text-xl font-bold text-blue-950 truncate"
          title={name}
        >
          {name}
        </h3>
        <p className="text-xl font-semibold text-yellow-500 mt-1">${price}</p>
      </div>

      {/* Add to Cart Button */}
      <button className="mb-4 flex items-center gap-2 px-5 py-2.5 text-base bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors">
        <FaShoppingCart className="w-5 h-5" />
        Add To Cart
      </button>
    </div>
  );
};

RecommendedBookCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
