import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
export default function Footer(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(prev => !prev);
    };
    return (
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Category
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-2 w-40 bg-white border rounded-md shadow-lg">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fiction</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Science</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Business</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Technology</a>
            </div>
          )}
        </div>
    )

}
