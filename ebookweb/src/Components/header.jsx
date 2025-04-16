import { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { getAccount } from '../Utils/api';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [userName, setUserName] = useState('Brian');
  const [gmail, setGmail] = useState('info@gmail.com');
  const [img, setImg] = useState('');

  useEffect(() => {
    getAccount()
      .then((res) => {
        console.log('Account data:', res);
        
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          const randomItem = data[Math.floor(Math.random() * data.length)];
          setUserName(randomItem.userName);
          setGmail(randomItem.gmail);
          setImg(randomItem.img);
        }
      })
      .catch((error) => {
        console.error('Error fetching account data:', error);
      });
  }, []);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const categories = ['Fiction', 'Science', 'Business', 'Technology', 'Romance', 'History'];

  return (
    <div className="w-full bg-white">
      <header className="max-w-screen-xl mx-auto flex items-center justify-evenly px-8 py-4 border-b border-gray-200 gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <img src="/ebook-icon.svg" alt="Bookland Logo" className="h-8 w-8" />
          <div className="leading-tight">
            <div className="text-xl font-bold text-indigo-900">
              eBook<span className="text-orange-400">Store</span>
            </div>
            <div className="text-xs text-gray-500">Book Store Website</div>
          </div>
        </div>

        {/* Search box */}
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
                        ? 'bg-amber-400 text-white font-semibold'
                        : 'text-gray-700'
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

        {/* Icons + Profile */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaRegHeart className="w-5 h-5 text-black" />
            <span className="absolute -top-2 -right-2 text-xs bg-orange-400 text-white rounded-full px-1">
              21
            </span>
          </div>

          <div className="relative">
            <MdOutlineShoppingCart className="w-5 h-5 text-black" />
            <span className="absolute -top-2 -right-2 text-xs bg-orange-400 text-white rounded-full px-1">
              5
            </span>
          </div>

          <div className="flex items-center gap-2 text-left">
            <img src={img} alt="User Avatar" className="w-8 h-8 rounded-md object-cover" />
            <div className="leading-tight">
              <div className="font-semibold text-indigo-900 text-sm">{userName}</div>
              <div className="text-xs text-gray-500">{gmail}</div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
