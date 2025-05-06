import React, { useEffect, useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomButton , handleAddToCart} from "../Components/UIElements";
import { getBooks } from "../Utils/api";


const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getBooks()
      .then((response) => {
        const loadedProducts = response.data || [];

        const myBooks = JSON.parse(localStorage.getItem("myBook")) || [];
        const myBookIds = myBooks.map((book) => book.id);

        const availableProducts = loadedProducts.filter(
          (product) => !myBookIds.includes(product.id)
        );

        setProducts(availableProducts);
      })
      .catch((err) => console.error("Error loading product data:", err));
  }, []);

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
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sale)}
              </p>

              <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CustomButton
                  height="40px"
                  width="200px"
                  bgColor="#f97316"
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn hành động mặc định của Link
                    handleAddToCart(item); // Gọi handleAddToCart từ cartUtils
                  }}
                />
              </div>
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