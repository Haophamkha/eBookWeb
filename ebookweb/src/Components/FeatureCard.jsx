import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-10 pl-12 shadow-md w-96 border border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-4 hover:border-yellow-300 group">
      <div className="text-6xl text-[#1a3c5e] mb-6 text-left group-hover:text-yellow-500 transition-colors duration-300">{icon}</div>
      <h3 className="text-3xl font-semibold text-[#1a3c5e] mb-3 text-left">{title}</h3>
      <p className="text-lg text-gray-600 mb-6 text-left">{description}</p>
      <a
        href="#"
        className="text-[#f5a623] font-semibold flex items-center hover:text-[#e69500] text-xl"
      >
        Tìm hiểu thêm
        <span className="flex">
          <IoIosArrowForward className="text-2xl -ml-0.5" />
          <IoIosArrowForward className="text-2xl -ml-4" />
        </span>
      </a>
    </div>
  );
};

export default FeatureCard;