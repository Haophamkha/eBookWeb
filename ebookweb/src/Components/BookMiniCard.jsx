import React from 'react';
import { FaStar } from 'react-icons/fa';

export const BookMiniCard = ({ book }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md p-4 w-full max-w-md">
      {/* Hình ảnh bìa sách */}
      <div className="w-24 h-32 mr-4">
        <img
          src={book.img}
          alt={`${book.name} Cover`}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Thông tin sách */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-gray-800">{book.name}</h2>
        <p className="text-sm text-gray-500">by {book.author}</p>
        <p className="text-lg font-semibold text-blue-600">${book.sale}</p>

        {/* Đánh giá sao */}
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < Math.round(book.rating / 2) ? 'text-yellow-400' : 'text-gray-300'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};