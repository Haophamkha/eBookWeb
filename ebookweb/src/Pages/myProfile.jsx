import React from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import useUserStore from "../Components/useUserStore";

const MyProfile = () => {
  // Lấy thông tin từ Zustand store
  const { userName, img } = useUserStore();

  return (
    <div className="bg-white min-h-screen">
      {/* Wrapper bọc cả sidebar và content, canh giữa màn hình */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex">
        {/* Sidebar bên trái */}
        <div className="w-80 bg-white p-6 flex flex-col items-center"> {/* Removed border */}
          {/* Avatar và thông tin */}
          <div className="w-full bg-[#FFF9E5] p-4 rounded-md mb-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f5a623] mb-3"> {/* Increased image size */}
              <img
                src={img || "https://via.placeholder.com/64x64?text=Avatar"} // Lấy ảnh từ Zustand
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base font-bold text-[#1a3c5e] uppercase">{userName || "User Name"}</h3>
            <p className="text-sm text-gray-600">WEB Developer</p> {/* Updated text */}
          </div>

          {/* Menu */}
          <ul className="space-y-2 w-full">
            <li className="flex items-center text-[#f5a623] font-medium text-sm bg-[#FFF9E5] px-3 py-4 rounded-sm min-h-[60px]"> {/* Increased padding and min-height */}
              <CiShop className="w-5 h-5 mr-2" />
              Profile
            </li>
            {[ // Menu items
              { icon: <MdOutlineShoppingCart className="w-5 h-5 mr-2" />, label: 'My Cart' },
              { icon: <CiShop className="w-5 h-5 mr-2" />, label: 'Shop' },
              { icon: <CiLogin className="w-5 h-5 mr-2" />, label: 'Log Out' },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center text-gray-600 text-sm px-3 py-4 rounded-sm min-h-[60px] hover:bg-[#FFF9E5] hover:text-[#f5a623] cursor-pointer transition-colors"
              >
                {item.icon}
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Nội dung bên phải */}
        <div className="flex-1 pl-6">
          {/* Basic Information */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#1a3c5e] mb-4 border-b-2 border-[#f5a623] inline-block pb-1">
              BASIC INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {['Your Name', 'Professional title', 'Languages', 'Age'].map((label, i) => (
                <div key={i}>
                  <label className="block text-xs font-medium text-gray-600 uppercase">{label}:</label>
                  <input
                    type="text"
                    placeholder={label}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400" 
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-xs font-medium text-gray-600 uppercase">Description:</label>
              <textarea
                placeholder="Description"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400 h-28" 
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold text-[#1a3c5e] mb-4 border-b-2 border-[#f5a623] inline-block pb-1">
              CONTACT INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {['Contact Number', 'Email Address', 'Country', 'Postcode', 'City', 'Full Address'].map((label, i) => (
                <div key={i}>
                  <label className="block text-xs font-medium text-gray-600 uppercase">{label}:</label>
                  <input
                    type={label === 'Email Address' ? 'email' : 'text'}
                    placeholder={label}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Nút Save Setting */}
          <div className="mt-8">
            <button className="bg-[#f5a623] text-white px-6 py-4 rounded-sm hover:bg-[#e69520] text-sm font-medium">
              SAVE SETTING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
