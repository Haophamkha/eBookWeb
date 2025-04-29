import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItemsFromAPI } from "../Utils/api";
import useUserStore from "../Components/useUserStore";
import { handlePurchaseBook } from "../Components/UIElements";
import { getAccountById, putData1 } from "../Utils/api";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { userId, isLoggedIn } = useUserStore((state) => state);

  useEffect(() => {
    const fetchCartData = async () => {
      if (!isLoggedIn || !userId) {
        alert("Vui lòng đăng nhập để xem giỏ hàng!");
        return;
      }

      try {
        const { data } = await getCartItemsFromAPI(userId);
        console.log("Dữ liệu giỏ hàng từ API:", data);
        if (data.length > 0) {
          setCartItems(data);
        } else {
          setCartItems([]);
          
        }
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng từ API:", error);
        alert("Không thể tải giỏ hàng. Vui lòng thử lại.");
      }
    };

    if (userId) {
      fetchCartData();
    }
  }, [userId, isLoggedIn]);

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
      setSelectedItems([]);
    } else {
      const allIds = cartItems.map((item) => item.id);
      setSelectedItems(allIds);
    }
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert("Bạn chưa chọn sản phẩm nào để thanh toán.");
      return;
    }

    try {
      // Lọc các sản phẩm được chọn
      const purchasedBooks = cartItems.filter((item) =>
        selectedItems.includes(item.id)
      );

      // Gọi handlePurchaseBook cho từng sản phẩm
      for (const book of purchasedBooks) {
        await handlePurchaseBook(book);
      }

      // Tải lại giỏ hàng từ server để đảm bảo đồng bộ
      const { data } = await getCartItemsFromAPI(userId);
      if (data.length > 0) {
        setCartItems(data);
      } else {
        setCartItems([]);
      }
      setSelectedItems([]);
      setTotal(0);

      alert("Thanh toán thành công! Sách đã được thêm vào mục My Book.");
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // Lấy thông tin tài khoản
      const accountRes = await getAccountById(userId);
      const user = accountRes.data;

      // Xóa ID sách khỏi cart
      const updatedCart = (user.cart || []).filter((id) => id !== itemId);

      // Cập nhật cart trên server
      await putData1(`/Account/${userId}`, {
        ...user,
        cart: updatedCart,
      });

      // Cập nhật giao diện
      const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCartItems);
      if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
      }
    } catch (error) {
      console.error("Lỗi khi xóa sách khỏi giỏ hàng:", error);
      alert("Không thể xóa sách. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-[90%] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Giỏ Hàng</h2>

      <div className="mb-4">
        <button
          onClick={handleSelectAll}
          className="bg-orange-600 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md"
        >
          {selectedItems.length === cartItems.length
            ? "Bỏ chọn tất cả"
            : "Chọn tất cả"}
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
                      onClick={() => handleRemoveItem(item.id)}
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