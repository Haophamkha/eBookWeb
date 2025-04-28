import React from 'react';
import CountFeature from './CountFeature';
import { Users, BookOpen, Store, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

export const CountFeatureList = () => {
  const features = [
    { icon: <Users size={48} color="#ea9d3a" />, count: 125663, title: 'Số khách hàng' },
    { icon: <BookOpen size={48} color="#ea9d3a" />, count: 50672, title: 'Bộ sưu tập sách' },
    { icon: <Store size={48} color="#ea9d3a" />, count: 1562, title: 'Chuỗi cửa hàng' },
    { icon: <Leaf size={48} color="#ea9d3a" />, count: 457, title: 'Tác giả nổi tiếng' },
  ];

  return (
    <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 justify-items-center">
        {features.map((item, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.2 }}
          >
            <CountFeature
              icon={item.icon}
              count={item.count}
              title={item.title}
            />
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};