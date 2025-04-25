import React from "react";
import UtilitiesCard from "./utilitiesCard";
import { AiFillThunderbolt, AiFillLike } from "react-icons/ai";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
const MotionDiv = motion.div; 

export const UtilitiesList = () => {
  const utilitiesData = [
    {
      icon: AiFillThunderbolt,
      title: "Quick Delivery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      icon: IoShieldCheckmark,
      title: "Secure Payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      icon: AiFillLike,
      title: "Best Quality",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      icon: FaStar,
      title: "Return Guarantee",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-20 py-16 pb-5">
      {utilitiesData.map((utility, index) => (
        <MotionDiv
          key={index}
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }} 
        >
          <UtilitiesCard
            icon={utility.icon}
            title={utility.title}
            description={utility.description}
          />
        </MotionDiv>
      ))}
    </div>
  );
};