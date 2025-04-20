import React from 'react';
import PropTypes from 'prop-types';

const UtilitiesCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      {/* Icon Container */}
      <div className="bg-orange-100 p-3 rounded-lg mb-3 hover:bg-orange-500 transition-colors duration-300 group">
        {Icon ? (
          <Icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded" />
        )}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      
      {/* Description */}
      <p className="text-base text-gray-500 max-w-[200px] leading-tight">{description}</p>
    </div>
  );
};

UtilitiesCard.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

UtilitiesCard.defaultProps = {
  icon: null,
};

export default UtilitiesCard;