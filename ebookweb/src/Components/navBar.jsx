import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CustomButton } from "./UIElements";
const navItems = [
  { title: "Home", path: "/" },
  {title: "Shop",path: "/shop"   },
  {title: "About Us",path: "/aboutus"},
  { title: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-6">
        {/* Nav items */}
        <div className="flex space-x-6 text-sm font-semibold text-indigo-900 ml-16">
          {navItems.map((item, index) => (
            <div key={index} className="relative h-full flex items-center">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md outline-none hover:text-orange-400 transition"
                  >
                    {item.title}
                    <FaChevronDown className="ml-1 h-3 w-3 text-gray-500" />
                  </button>

                  {openDropdownIndex === index && (
                    <div className="absolute z-50 top-full mt-2 left-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                      {item.dropdown.map((option, optIdx) => (
                        <NavLink
                          key={optIdx}
                          to={option.path}
                          onClick={() => setOpenDropdownIndex(null)}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm transition ${
                              isActive
                                ? "bg-orange-400 text-white font-semibold"
                                : "text-indigo-900 hover:bg-gray-100"
                            }`
                          }
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
                  className={({ isActive }) =>
                    `px-3 py-2 transition ${
                      isActive
                        ? "text-orange-500 font-semibold"
                        : "hover:text-orange-400"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex items-center pr-30">
        <CustomButton to="/contact" label="Get in Touch" icon={false} />
        </div>
      </div>
    </nav>
  );
}
