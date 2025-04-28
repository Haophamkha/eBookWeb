import React from "react";
import PropTypes from "prop-types";
import { CustomButton } from "./UIElements";


export const RecommendedBookCard = ({ img, name, price }) => {
  return (
    <div className="flex flex-col justify-between items-center bg-white rounded-lg shadow-md w-[200px] min-h-[380px]">
      <img
        src={img}
        alt={name}
        className="w-full h-72 object-cover rounded-lg"
      />

      <div className="p-3 text-center w-full flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-blue-950 truncate" title={name}>
          {name}
        </h3>
        <p className="text-xl font-semibold text-yellow-500 mt-1">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </p>
      </div>

      <CustomButton bgColor="#1a1668" />
    </div>
  );
};

RecommendedBookCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
