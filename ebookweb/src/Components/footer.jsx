import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Logo + Intro */}
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <img src="/ebook-icon.svg" alt="Logo" className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold text-indigo-900">
                eBook<span className="text-orange-400">Store</span>
              </div>
              <div className="text-base ">Book Store Website</div>
            </div>
          </div>
          <p className="text-xl mb-4 text-gray-500">
          eBookStore là nền tảng trực tuyến tiện lợi, nơi bạn có thể khám phá và mua sắm hàng nghìn cuốn sách điện tử từ mọi thể loại
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

        <div>
          <h4 className="text-indigo-900 font-semibold text-xl mb-3">
            Our Links
          </h4>
          <ul className="space-y-3 text-gray-500 text-lg">
            <li>
              <span className="text-orange-400">&rsaquo;</span> About Us
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Contact Us
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Privacy Policy
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Pricing Table
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> FAQ
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-indigo-900 font-semibold text-xl mb-3">
            Bookland ?
          </h4>
          <ul className="space-y-3 text-gray-500 text-lg">
            <li>
              <span className="text-orange-400">&rsaquo;</span> eBookStore
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Services
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Book Details
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Blog Details
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Shop
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-indigo-900 font-semibold text-xl mb-3">
            Resources
          </h4>
          <ul className="space-y-3 text-gray-500 text-lg">
            <li>
              <span className="text-orange-400">&rsaquo;</span> Download
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Help Center
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Shop Cart
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Login
            </li>
            <li>
              <span className="text-orange-400">&rsaquo;</span> Partner
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-indigo-900 font-semibold text-xl mb-3">
            Get in Touch With Us
          </h4>
          <ul className="space-y-4 text-gray-500 text-lg">
            <li className="flex items-center gap-3">
              <MdLocationOn className="text-orange-400 text-7xl" />
              <span className="text-lg">
              12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh
              </span>
            </li>

            <li className="flex items-center gap-3">
              <MdPhone className="text-orange-400 text-3xl" />
              +012 345 6789
            </li>
            <li className="flex items-center gap-3">
              <MdPhone className="text-orange-400 text-3xl" />
              +012 345 6789
            </li>
            <li className="flex items-center gap-3">
              <MdEmail className="text-orange-400 text-3xl" />
              haop@eBookStore@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <MdEmail className="text-orange-400 text-3xl" />
              uyen@eBookStore@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Credit */}
      <div className="border-t border-gray-200 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-lg sm:text-xl text-gray-500">
          <span>
            eBook Store Ecommerce Website - © 2025 All Rights Reserved
          </span>
          <span className="mt-2 sm:mt-0">
            Made by
            <span className="text-orange-500 font-semibold text-xl">
              {" "}
              HU_team
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
