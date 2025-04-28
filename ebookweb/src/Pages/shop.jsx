import React, { useEffect, useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const loadedProducts = data.book || [];

        const myBooks = JSON.parse(localStorage.getItem("myBook")) || [];
        const myBookIds = myBooks.map((book) => book.id);

        // Lọc bỏ những sách đã có trong myBook
        const availableProducts = loadedProducts.filter(
          (product) => !myBookIds.includes(product.id)
        );

        setProducts(availableProducts);
      })
      .catch((err) => console.error("Error loading product data:", err));
  }, []);

  const addToCart = (product, e) => {
    e.preventDefault(); // Ngăn hành động mặc định của Link
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = existingCart.find((item) => item.id === product.id);

    if (isInCart) {
      alert(`Sản phẩm "${product.name}" đã có trong giỏ hàng!`);
    } else {
      const updatedCart = [...existingCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    }
  };

  return (
    <div className="w-[80%] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm nổi bật</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {products.length > 0 ? (
          products.map((item, index) => (
            <Link
              to={`/shop/${item.id}`}
              state={{ book: item }}
              key={index}
              className="h-90 group bg-white shadow border rounded-xl overflow-hidden transition-transform transform hover:scale-105 relative"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-60 w-full object-contain p-2"
              />
              <div className="p-3 space-y-1 text-center">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <div className="group-hover:opacity-0">
                  <p className="text-xs text-gray-500">{item.author}</p>
                  <div className="flex justify-center items-center gap-1 text-yellow-500 text-sm">
                    <Star fill="currentColor" className="w-4 h-4" />
                    <span className="text-gray-700">{item.star}</span>
                  </div>
                </div>
              </div>

              <p className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xl font-bold text-orange-700">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
              </p>

              <button
                onClick={(e) => addToCart(item, e)}
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-orange-500 text-white px-1 py-1 text-sm rounded shadow transition-all duration-300 w-[80%] flex items-center justify-center gap-1"
              >
                <ShoppingCart size={16} />
                <p className="whitespace-nowrap">Thêm vào giỏ hàng</p>
              </button>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Bạn đã mua hết sách trong cửa hàng 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
