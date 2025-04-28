
import { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../Components/useUserStore";
import { CustomButton } from "./UIElements";
import { getBooks } from "../Utils/api";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Thể loại");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [books, setBooks] = useState([]);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [myBookCount, setMyBookCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);


  const { userName, gmail, img, isLoggedIn, clearUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ["/", "/login", "/register", "/shop"];

  useEffect(() => {
    if (!isLoggedIn && !publicRoutes.includes(location.pathname)) {
      console.log("User not logged in, redirecting to /login from", location.pathname);
      navigate("/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  useEffect(() => {
    const updateCounts = () => {
      const myBook = JSON.parse(localStorage.getItem("myBook")) || [];
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      setMyBookCount(myBook.length);
      setCartCount(cart.length);
    };
    window.addEventListener("updateCounts", updateCounts);
    updateCounts();
    return () => {
      window.removeEventListener("updateCounts", updateCounts);
    };
  }, []);
  
  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        const booksData = response.data.map((book, index) => ({
          ...book,
          id: book.id || index.toString(),
        }));
        console.log("Books data from getBooks:", booksData);
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    };
    fetchBooks();
  }, []);

  const categories = Array.from(
    new Set(books.flatMap((book) => book.tags || []))
  ).sort();

  useEffect(() => {
    let filteredBooks = books;
    if (searchQuery.trim() !== "") {
      const keywords = searchQuery.toLowerCase().split(/\s+/).filter((word) => word.length > 0);
      filteredBooks = filteredBooks.filter((book) => {
        const title = book.name.toLowerCase();
        return keywords.every((keyword) => title.includes(keyword));
      });
    }
    
    if (selectedCategory !== "Category") {
      filteredBooks = filteredBooks.filter((book) =>
        (book.tags || []).includes(selectedCategory)
      );
    }

    setSearchResults(filteredBooks);
  }, [searchQuery, selectedCategory, books]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      console.log("Searching:", searchQuery);
    } else {
      alert("Please enter search content!");
    }
  };

  const handleLogout = () => {
    console.log("Logout called");
    clearUser();
    setShowProfileMenu(false);
    console.log("Redirecting to /login");
    navigate("/login");
  };

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
        <div className="relative flex items-center bg-gray-100 rounded-md w-full max-w-lg h-12">
          <div className="relative h-full flex items-center">
            <button
              onClick={toggleDropdown}
              className="flex items-center h-full px-6 text-sm font-medium text-gray-700 bg-gray-100 outline-none"
            >
              {selectedCategory}
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </button>

            {isOpen && (
              <div className="absolute z-50 top-full mt-1 left-0 bg-white border rounded-md shadow-lg">
                <div className="max-h-60 overflow-y-auto">
                  {categories.map((category, index) => (
                    <div key={index} className="relative">
                      <a
                        href="#"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsOpen(false);
                        }}
                        className={`block px-3 py-1.5 text-sm hover:bg-gray-100 w-full text-left ${
                          category === selectedCategory
                            ? "bg-amber-400 text-white font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {category}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-300 mx-2" />

          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for books here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchInputFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchInputFocused(false), 200)}
              className="w-full bg-transparent px-3 py-1.5 outline-none text-sm placeholder-blue-800"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              style={{ cursor: "pointer" }}
            >
              <Search className="w-5 h-5 text-gray-500" />
            </button>

            {isSearchInputFocused && searchResults.length > 0 && (
              <div className="absolute z-50 top-full mt-1 left-0 w-full max-w-lg bg-white border rounded-md shadow-lg">
                <div className="max-h-96 overflow-y-auto">
                  {searchResults.map((book) => (
                    <Link
                      key={book.id}
                      to={`/book/${book.id}`}
                      className="flex items-center px-3 py-2 hover:bg-gray-100"
                      onClick={() => setIsSearchInputFocused(false)}
                    >
                      <img
                        src={book.img}
                        alt={`Cover of ${book.name}`}
                        className="w-12 h-16 object-cover mr-3"
                      />
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-gray-800">{book.name}</div>
                        <div className="flex flex-wrap gap-1 mb-1">
                          {(book.tags || []).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs text-teal-600 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-orange-400">
                            {parseFloat(book.price).toLocaleString()} VNĐ
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          {isLoggedIn && (
            <>
              <Link to="/mybook" className="relative" style={{ marginLeft: "-50px" }}>
                <IoBookOutline className="w-6 h-6 text-black" />
                {myBookCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-orange-400 text-white rounded-full px-1">
                    {myBookCount}
                  </span>
                )}
              </Link>
              <div className="relative cursor-pointer" style={{ marginLeft: "15px", marginRight: "15px" }}>
              <Link to="/cart" className="relative">
                <MdOutlineShoppingCart className="w-6 h-6 text-black" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-orange-400 text-white rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            </>
          )}

          {isLoggedIn ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 text-left cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <img
                  src={img}
                  alt="Profile picture"
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="leading-tight">
                  <div className="font-semibold text-indigo-900 text-xl">
                    {userName}
                  </div>
                  <div className="text-xs text-gray-500">{gmail}</div>
                </div>
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-50 p-2">
                  <div className="px-4 py-2 border-b-1 border-gray-200">
                    <div className="font-semibold text-indigo-900">{userName}</div>
                    <div className="text-xs text-gray-500">{gmail}</div>
                  </div>
                  <Link
                    to="/myprofile"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 border-b"
                  >
                    <VscAccount className="w-4 h-4 text-orange-400" />
                    Profile
                  </Link>
                  <CustomButton
                    label="Log out"
                    onClick={handleLogout}
                    icon={null}
                    width="100%"
                    className="mt-3"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-row gap-2 pt-4">
              <Link to="/login">
                <CustomButton
                  label="Đăng nhập"
                  icon={null}
                  to="/login"
                  bgColor="black"
                  className="cursor-pointer"
                />
              </Link>
              <Link to="/register">
                <CustomButton
                  label="Đăng ký"
                  icon={null}
                  to="/register"
                  bgColor="#FF7F00"
                  className="cursor-pointer text-black"
                />
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
