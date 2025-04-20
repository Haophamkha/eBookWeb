import { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { getAccount } from "../Utils/api";
import { IoBookOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useUserStore from "../Components/useUserStore";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");

  const setUser = useUserStore((state) => state.setUser);
  const { userName, gmail, img } = useUserStore();

  useEffect(() => {
    getAccount().then((res) => {
      const randomUser = res.data[Math.floor(Math.random() * res.data.length)];
      setUser({
        userName: randomUser.userName,
        gmail: randomUser.gmail,
        img: randomUser.img,
      });
    });
  }, [setUser]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleCart = () => setShowCart((prev) => !prev);
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

  const categories = [
    "Fiction",
    "Science",
    "Business",
    "Technology",
    "Romance",
    "History",
  ];

  return (
    <div className="w-full bg-white relative">
      <header className="max-w-screen-xl mx-auto flex items-center justify-evenly px-8 py-4 border-b border-gray-200 gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/ebook-icon.svg" alt="Bookland Logo" className="h-8 w-8" />
          <div className="leading-tight">
            <div className="text-xl font-bold text-indigo-900">
              eBook<span className="text-orange-400">Store</span>
            </div>
            <div className="text-xs text-gray-500">Book Store Website</div>
          </div>
        </Link>

        {/* Search */}
        <div className="relative flex items-center bg-gray-100 rounded-md w-full max-w-md h-10">
          <div className="relative h-full flex items-center">
            <button
              onClick={toggleDropdown}
              className="flex items-center h-full px-4 text-sm font-medium text-gray-700 bg-gray-100 outline-none"
            >
              {selectedCategory}
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </button>

            {isOpen && (
              <div className="absolute z-50 top-full mt-1 left-0 w-36 bg-white border rounded-md shadow-lg">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsOpen(false);
                    }}
                    className={`block px-3 py-1.5 text-sm hover:bg-gray-100 ${
                      category === selectedCategory
                        ? "bg-amber-400 text-white font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {category}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-300 mx-2" />

          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search Books"
              className="w-full bg-transparent px-3 py-1.5 outline-none text-sm placeholder-blue-300"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        
        <div className="flex items-center gap-4 relative">
          <Link to="/mybook" className="relative">
            <IoBookOutline className="w-5 h-5 text-black" />
            <span className="absolute -top-2 -right-2 text-xs bg-orange-400 text-white rounded-full px-1">
              21
            </span>
          </Link>

          
          <div className="relative cursor-pointer">
            <div onClick={toggleCart}>
              <MdOutlineShoppingCart className="w-5 h-5 text-black" />
              <span className="absolute -top-2 -right-2 text-xs bg-orange-400 text-white rounded-full px-1">
                5
              </span>
            </div>

            {/* Cart Overlay */}
            {showCart && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg border rounded-lg p-4 z-40">
                <h3 className="text-sm font-semibold mb-2">Your Cart</h3>
                <div className="text-gray-500 text-sm">
                  Cart is currently empty.
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <div
              className="flex items-center gap-2 text-left cursor-pointer"
              onClick={toggleProfileMenu}
            >
              <img
                src={img}
                alt="User Avatar"
                className="w-8 h-8 rounded-md object-cover"
              />
              <div className="leading-tight">
                <div className="font-semibold text-indigo-900 text-sm">
                  {userName}
                </div>
                <div className="text-xs text-gray-500">{gmail}</div>
              </div>
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                >
                  My Orders
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
