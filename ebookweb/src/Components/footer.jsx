import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionFooter = motion.footer;

export default function Footer() {
  const navigate = useNavigate();

  const linkMap = {
    "About Us": "/about",
    "Contact Us": "/contact",
    "eBookStore": "/",
    "Book Details": "/books",
    "Shop": "/shop",
    "Shop Cart": "/cart",
    "Login": "/login",
  };

  const handleNavigate = (item) => {
    const path = linkMap[item];
    if (path) {
      navigate(path);
    }
  };

  return (
    <MotionFooter
      className="bg-white border-t border-gray-200 text-sm text-gray-600"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <img src="/ebook-icon.svg" alt="Logo" className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold text-indigo-900">
                eBook<span className="text-orange-400">Store</span>
              </div>
              <div className="text-base">Book Store Website</div>
            </div>
          </div>
          <p className="text-xl mb-4 text-gray-500">
            eBookStore là nền tảng trực tuyến tiện lợi, nơi bạn có thể khám phá
            và mua sắm hàng nghìn cuốn sách điện tử từ mọi thể loại
          </p>
          <div className="flex gap-4">
            {[FaFacebookF, FaYoutube, FaLinkedinIn, FaInstagram].map(
              (Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 bg-orange-100 text-orange-400 rounded-full flex items-center justify-center hover:bg-orange-200 transition"
                >
                  <Icon className="text-xl" />
                </div>
              )
            )}
          </div>
        </div>

        <div className="ml-20">
          <h4 className="text-indigo-900 font-semibold text-xl mb-3">
            Our Links
          </h4>
          <ul className="space-y-3 text-gray-500 text-lg">
            {["About Us", "Contact Us", "Login"].map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleNavigate(item)}
                className="cursor-pointer hover:underline"
              >
                <span className="text-orange-400">›</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-indigo-900 font-semibold text-xl mb-3">
            Our Store
          </h4>
          <ul className="space-y-3 text-gray-500 text-lg">
            {["eBookStore", "Book Details", "Shop", "Shop Cart"].map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleNavigate(item)}
                className="cursor-pointer hover:underline"
              >
                <span className="text-orange-400">›</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-indigo-900 font-semibold text-xl mb-3">
            Get in Touch With Us
          </h4>
          <ul className="space-y-4 text-gray-500 text-lg">
            <li className="flex items-center gap-3">
              <MdLocationOn className="text-orange-400 text-6xl" />
              <span>12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh</span>
            </li>

            <li className="flex items-center gap-3">
              <MdPhone className="text-orange-400 text-2xl" />
              <div className="leading-tight">
                <span className="block">+012 345 6789</span>
                <span className="block">+012 345 6789</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <MdOutlineEmail className="text-orange-400 text-2xl mt-4" />
              <div>
                <span className="block">haopEbook@gmail.com</span>
                <span className="block">uyenEbook@gmail.com</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-lg sm:text-xl text-gray-500">
          <span>
            eBook Store Ecommerce Website - © 2025 All Rights Reserved
          </span>
          <span className="mt-2 sm:mt-0">
            Made by{" "}
            <span className="text-orange-500 font-semibold text-xl">
              HU_team
            </span>
          </span>
        </div>
      </div>
    </MotionFooter>
  );
}
