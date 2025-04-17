import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Đảm bảo sử dụng NavLink để giữ cho active class

const navItems = [
  {
    title: "Home",
    dropdown: [
      { label: "Home 1", path: "/" },
      { label: "Home 2", path: "/home-2" },
    ],
  },
  {
    title: "Pages",
    dropdown: [
      { label: "About", path: "/about" },
      { label: "Services", path: "/services" },
    ],
  },
  {
    title: "Shop",
    dropdown: [
      { label: "Products", path: "/products" },
      { label: "Cart", path: "/cart" },
    ],
  },
  {
    title: "Blog",
    dropdown: [
      { label: "Latest Posts", path: "/blog" },
      { label: "Categories", path: "/categories" },
    ],
  },
  {
    title: "Post Layout",
    dropdown: [
      { label: "Layout 1", path: "/layout-1" },
      { label: "Layout 2", path: "/layout-2" },
    ],
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
];

export default function Navbar() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const selectItem = (parentIndex, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [parentIndex]: item.label, // Lưu lại mục con đã chọn vào đối tượng selectedItems
    }));
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-6 pl-14">
        <div className="flex space-x-4 text-sm font-semibold text-indigo-900 ml-16">
          {navItems.map((item, index) => (
            <div key={index} className="relative h-full flex items-center">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center h-full px-3 py-2 text-sm font-medium rounded-md outline-none hover:text-orange-400 transition"
                  >
                    {/* Hiển thị title gốc của item hoặc tên mục con nếu có */}
                    {selectedItems[index] || item.title}
                    <FaChevronDown className="ml-2 h-3 w-3 text-gray-500" />
                  </button>

                  {openDropdownIndex === index && (
                    <div className="absolute z-50 top-full mt-1 left-0 w-26 bg-white border border-gray-300 rounded-md shadow-lg">
                      {item.dropdown.map((option, optIdx) => (
                        <NavLink
                          key={optIdx}
                          to={option.path}
                          onClick={() => selectItem(index, option)} // Cập nhật mục đã chọn
                          className={`block px-3 py-1.5 text-sm transition duration-150 ${
                            selectedItems[index] === option.label
                              ? "bg-amber-400 text-white font-semibold"
                              : "text-indigo-900 hover:bg-gray-100"
                          }`}
                        >
                          {option.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className="px-3 py-2 hover:text-orange-400 transition"
                >
                  {item.title}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="ml-64 bg-orange-400 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-md shadow transition">
          Get In Touch
        </button>
      </div>
    </nav>
  );
}
