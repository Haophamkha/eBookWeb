import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const selectedProducts = cartItems.filter((p) =>
      selectedItems.includes(p.id)
    );
    const totalPrice = selectedProducts.reduce((acc, p) => acc + p.price, 0);
    setTotal(totalPrice);
  }, [selectedItems, cartItems]);

  const handleSelectItem = (item) => {
    let updatedSelected;
    if (selectedItems.includes(item.id)) {
      updatedSelected = selectedItems.filter((id) => id !== item.id);
    } else {
      updatedSelected = [...selectedItems, item.id];
    }
    setSelectedItems(updatedSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]); // Nếu đã chọn hết thì bỏ chọn
    } else {
      const allIds = cartItems.map((item) => item.id);
      setSelectedItems(allIds); // Chọn tất cả
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Bạn chưa chọn sản phẩm nào để thanh toán.");
      return;
    }

    const purchasedBooks = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    const storedMyBooks = JSON.parse(localStorage.getItem("myBook")) || [];
    const updatedMyBooks = [...storedMyBooks, ...purchasedBooks];
    localStorage.setItem("myBook", JSON.stringify(updatedMyBooks));

    const remainingCart = cartItems.filter(
      (item) => !selectedItems.includes(item.id)
    );
    setCartItems(remainingCart);
    localStorage.setItem("cart", JSON.stringify(remainingCart));

    setSelectedItems([]);
    setTotal(0);

    alert("Thanh toán thành công! Sách đã được thêm vào mục My Book.");
  };

  return (
    <div className="w-[90%] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Giỏ Hàng</h2>

      <div className="mb-4">
        <button
          onClick={handleSelectAll}
          className="bg-orange-600 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md"
        >
          {selectedItems.length === cartItems.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl overflow-hidden">
          <thead className="bg-indigo-900 text-white">
            <tr>
              <th className="py-3 px-6 text-left"></th>
              <th className="py-3 px-6 text-left">Sản phẩm</th>
              <th className="py-3 px-6 text-left">Tên sách</th>
              <th className="py-3 px-6 text-left">Giá</th>
              <th className="py-3 px-6 text-left">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item)}
                      className="w-5 h-5 accent-indigo-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <img
                      src={item.img}
                      alt={item.name}
                      onClick={() =>
                        navigate(`/shop/${item.id}`, { state: { book: item } })
                      }
                      className="w-16 h-24 object-cover rounded cursor-pointer hover:opacity-80"
                    />
                  </td>
                  <td className="py-4 px-6 font-medium">
                    <div
                      onClick={() =>
                        navigate(`/shop/${item.id}`, { state: { book: item } })
                      }
                      className="text-indigo-700 hover:underline cursor-pointer"
                    >
                      {item.name}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-indigo-900 font-semibold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => {
                        const updatedCart = cartItems.filter(
                          (p) => p.id !== item.id
                        );
                        setCartItems(updatedCart);
                        localStorage.setItem("cart", JSON.stringify(updatedCart));

                        // Nếu sản phẩm bị xóa mà đang được chọn thì cập nhật lại selectedItems
                        if (selectedItems.includes(item.id)) {
                          setSelectedItems(selectedItems.filter(id => id !== item.id));
                        }
                      }}
                      className="bg-red-500 hover:bg-pink-600 text-white p-2 rounded-sm"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Không có sản phẩm nào trong giỏ hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tổng giá tiền và nút thanh toán */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-2xl font-bold">
          Tổng cộng:{" "}
          <span className="text-orange-600">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(total)}
          </span>
        </h3>
        <button
          onClick={handleCheckout}
          className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg text-lg"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
