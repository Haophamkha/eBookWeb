import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const navItems = [
  { title: "Home", dropdown: ["Home 1", "Home 2"] },
  { title: "Pages", dropdown: ["About", "Services"] },
  { title: "Shop", dropdown: ["Products", "Cart"] },
  { title: "Blog", dropdown: ["Latest Posts", "Categories"] },
  { title: "Post Layout", dropdown: ["Layout 1", "Layout 2"] },
  { title: "Contact Us" },
];

export default function Navbar() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const selectItem = (parentIndex, item) => {
    setSelectedItems((prev) => ({ ...prev, [parentIndex]: item }));
    setOpenDropdownIndex(null);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-6 pl-14">
        {/* Navigation links */}
        <div className="flex space-x-4 text-sm font-semibold text-indigo-900 ml-16">
          {navItems.map((item, index) => (
            <div key={index} className="relative h-full flex items-center">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center h-full px-3 py-2 text-sm font-medium rounded-md outline-none hover:text-orange-400 transition"
                  >
                    {selectedItems[index] || item.title}
                    <FaChevronDown className="ml-2 h-3 w-3 text-gray-500" />
                  </button>

                  {openDropdownIndex === index && (
                    <div className="absolute z-50 top-full mt-1 left-full ml-2 w-36 rounded-md shadow-none">
                      {item.dropdown.map((option, optIdx) => (
                        <a
                          key={optIdx}
                          href="#"
                          onClick={() => selectItem(index, option)}
                          className={`block px-3 py-1.5 text-sm transition ${
                            selectedItems[index] === option
                              ? "text-orange-400 font-semibold"
                              : "text-indigo-900"
                          } hover:text-orange-400`}
                        >
                          {option}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href="#"
                  className="px-3 py-2 hover:text-orange-400 transition"
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="ml-auto mr-50 bg-orange-400 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-md shadow transition">
          Get In Touch
        </button>
      </div>
    </nav>
  );
}
