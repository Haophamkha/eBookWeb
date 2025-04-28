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
      title: "Giao Hàng Nhanh Chóng",
      description:
        "Nhận hàng chỉ trong thời gian ngắn, đảm bảo đúng hẹn và tiện lợi cho bạn.",
    },
    {
      icon: IoShieldCheckmark,
      title: "Thanh Toán An Toàn",
      description:
        "Giao dịch được bảo mật tuyệt đối, yên tâm mua sắm mà không lo rủi ro.",
    },
    {
      icon: AiFillLike,
      title: "Chất Lượng Đảm Bảo",
      description:
        "Sản phẩm được kiểm định kỹ lưỡng, mang đến chất lượng tốt nhất cho bạn.",
    },
    {
      icon: FaStar,
      title: "Bảo Hành Đổi Trả",
      description:
        "Hỗ trợ đổi trả dễ dàng nếu sản phẩm không đúng như cam kết, bạn hoàn toàn yên tâm.",
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