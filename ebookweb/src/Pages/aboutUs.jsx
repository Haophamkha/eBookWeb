import React, { useEffect, useState } from 'react';
import FeatureCard from '../Components/FeatureCard';
import { FaBook, FaAward, FaStore, FaCheck } from 'react-icons/fa';
import { BackgroundHeader } from '../Components/backgroundHeader';
import { NavLink } from 'react-router-dom'; // ✅ Thêm NavLink

const AboutUs = () => {
  const [experience, setExperience] = useState(20);

  useEffect(() => {
    let current = 20;
    const target = 50;
    const interval = setInterval(() => {
      if (current < target) {
        current++;
        setExperience(current);
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <BackgroundHeader label="About Us" />

      {/* Phần giới thiệu */}
      <div className="my-14 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
        {/* Phần ảnh bên trái */}
        <div className="flex-1 flex gap-6">
          {/* Ảnh lớn */}
          <div className="w-[60%] h-[460px] rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://via.placeholder.com/400x460?text=Sách+với+hoa"
              alt="Sách với hoa"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ảnh nhỏ + list */}
          <div className="w-[40%] flex flex-col justify-between h-full">
            <div className="w-full h-[220px] rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://via.placeholder.com/300x200?text=Giá+sách"
                alt="Giá sách"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="mt-6 space-y-2">
              {[
                'Comics & Graphics',
                'Biography',
                'Literary Collections',
                'Children Fiction',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <FaCheck className="text-orange-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Phần nội dung bên phải */}
        <div className="flex-1 space-y-6">
          <h2 className="text-5xl font-bold text-blue-900">
            Bookland Is Best Choice For Learners
          </h2>
          <p className="text-gray-600 text-lg">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration which don't look even slightly
            believable. It Is A Long Established Fact That A Reader Will Be
            Distracted.
          </p>

          {/* ✅ NavLink thay cho button */}
          <NavLink
            to="/contact"
            className="bg-orange-400 hover:bg-orange-500 text-white text-lg px-8 py-3 rounded-lg font-semibold w-fit transition"
          >
            Contact Us
          </NavLink>

          {/* Badge 50+ */}
          <div className="ml-72 bg-orange-500 text-white px-6 py-4 rounded-xl shadow-xl z-20 w-52 text-left mt-10">
            <p className="text-[72px] font-extrabold leading-none">{experience}+</p>
            <p className="text-2xl font-semibold tracking-wide">Years of Experience</p>
          </div>
        </div>
      </div>

      {/* Phần Our Mission */}
      <div className="bg-gray-100 py-14">
        <div className="px-4 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <div className="flex flex-col md:flex-row gap-10 justify-center">
            <FeatureCard
              icon={<FaBook />}
              title="Best Bookstore"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <FeatureCard
              icon={<FaAward />}
              title="Trusted Seller"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <FeatureCard
              icon={<FaStore />}
              title="Expand Store"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
