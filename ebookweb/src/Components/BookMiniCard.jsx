import React from 'react';
import { FaStar } from 'react-icons/fa';

export const BookMiniCard = ({ book }) => {
  const sale = parseFloat(book.sale) / 1000;
  const star = parseFloat(book.star);

  return (
    <div className="flex items-center bg-white rounded-lg p-4 w-full max-w-[350px] h-[auto] flex-shrink-0">
      <div className="w-24 h-32 mr-4">
        <img
          src={book.img}
          alt={`Bìa sách ${book.name}`}
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{book.name}</h2>
        <p className="text-sm text-gray-500 mb-2">bởi {book.author}</p>

        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-blue-600">${sale.toFixed(2)}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < Math.round(star) ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};