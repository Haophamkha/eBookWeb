import React from "react";
import CountUp from "react-countup";
const CountFeature = ({ icon, count, title }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="border-2 border-dotted border-orange-400 p-8 rounded-lg">
        {icon}
      </div>
      <div className="text-4xl font-bold text-indigo-900">
        <CountUp end={count} duration={2} separator="," />
      </div>
      <div className="text-gray-500 text-xl">{title}</div>
    </div>
  );
};

export default CountFeature;
