import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getAccountById, putData1 } from "../Utils/api";
import useUserStore from "../Components/useUserStore";
export const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 rounded-full bg-orange-300 hover:bg-orange-400 flex items-center justify-center"
  >
    <IoIosArrowBack className="text-white text-xl" />
  </button>
);

export const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 rounded-full bg-orange-300 hover:bg-orange-400 flex items-center justify-center"
  >
    <IoIosArrowForward className="text-white text-xl" />
  </button>
);



export const CustomButton = ({
  width = "auto",
  height = "auto",
  label = "Thêm vào giỏ hàng",
  icon = undefined, 
  to = null,
  onClick,
  bgColor = "#eaa451",
  className = "",
  children,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to);
  };

  const IconComponent = icon === null ? null : icon || FaShoppingCart;

  return (
    <>
      <style>
        {`
          .custom-button {
            position: relative;
            overflow: hidden;
            z-index: 0;
            transition: background-color 0.3s ease;
          }

          .custom-button::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.15);
            transition: left 1s ease;
            z-index: 1;
            pointer-events: none;
          }

          .custom-button:hover::before {
            left: 100%;
          }

          .icon-wrapper {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .custom-button:hover .icon-wrapper {
            animation: flyInside 0.8s ease-in-out;
          }

          @keyframes flyInside {
            0% { transform: translateY(0); opacity: 1; }
            40% { transform: translateY(-100%); opacity: 0; }
            60% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      <button
        onClick={handleClick}
        className={`custom-button group mb-4 flex items-center justify-center ${className} px-3 py-3 text-base text-white rounded-md shadow transition`}
        style={{ width, height, backgroundColor: bgColor }}
      >
        {IconComponent && (
          <span className="icon-wrapper mr-2">
            {React.createElement(IconComponent, { size: 16, className: "w-5 h-5" })}
          </span>
        )}
        <span className="z-10">{children || label}</span>
      </button>
    </>
  );
};


CustomButton.propTypes = {
  width: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};

export const BuyNowButton = ({ onClick }) => {
  return (
    <>
      <style>
        {`
          .buy-now-btn {
            position: relative;
            overflow: hidden;
            background-color: #f0a64f;
            color: white;
            transition: background-color 0.3s ease;
          }

          .buy-now-btn::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: left 0.7s ease;
            z-index: 1;
            pointer-events: none;
          }

          .buy-now-btn:hover::before {
            left: 100%;
          }

          .buy-now-btn span {
            position: relative;
            z-index: 2;
          }
        `}
      </style>

      <button className="buy-now-btn px-5 py-2.5 text-base rounded-lg" onClick={onClick}>
        <span>Mua Ngay</span>
      </button>
    </>
  );
};
export const SeeDetailsButton = ({ onClick }) => {
  return (
    <>
      <style>
        {`
          .see-details-btn {
            position: relative;
            overflow: hidden;
            border: 1.5px solid #1e1b4b;
            background-color: transparent;
            color: #1e1b4b;
            transition: all 0.3s ease;
          }

          .see-details-btn::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: #1a1668;
            transition: left 0.7s ease;
            z-index: 1;
            pointer-events: none;
          }

          .see-details-btn:hover::before {
            left: 100%;
          }

          .see-details-btn span {
            position: relative;
            z-index: 2;
          }

          .see-details-btn:hover {
            background-color: #1a1668;
            color: white;
          }
        `}
      </style>

      <button className="see-details-btn px-5 py-2.5 font-semibold rounded-lg" onClick={onClick}>
        <span>Xem chi tiết</span>
      </button>
    </>
  );
};


export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 80;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-400 text-white p-4 rounded-full shadow-lg hover:bg-orange-500 transition"
          style={{
            border: "2px dashed #f6c28b",
          }}
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};


export const handleAddToCart = async (product) => {
  const { userId, isLoggedIn } = useUserStore.getState();

  if (!isLoggedIn || !userId) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
    return;
  }

  try {
    // Lấy thông tin tài khoản người dùng
    const res = await getAccountById(userId);
    const user = res.data;

    // Kiểm tra sản phẩm đã được mua chưa (trong purchasedBooks)
    const isPurchased = user.purchasedBooks?.includes(product.id);
    if (isPurchased) {
      alert(`Sản phẩm "${product.name}" đã được mua và không thể thêm vào giỏ hàng!`);
      return;
    }

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const isInCart = user.cart?.includes(product.id);
    if (isInCart) {
      alert(`Sản phẩm "${product.name}" đã có trong giỏ hàng!`);
      return;
    }

    // Thêm ID sách vào giỏ hàng
    const updatedCart = [...(user.cart || []), product.id];

    // Cập nhật giỏ hàng trên server
    await putData1(`/Account/${userId}`, {
      ...user,
      cart: updatedCart,
    });

    // Đồng bộ giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Phát sự kiện updateCounts để Header cập nhật cartCount
    window.dispatchEvent(new Event("updateCounts"));

    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    alert("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
  }
};


export const handlePurchaseBook = async (product) => {
  const { userId, isLoggedIn } = useUserStore.getState();

  // Kiểm tra đăng nhập
  if (!isLoggedIn || !userId) {
    alert("Vui lòng đăng nhập để mua sản phẩm.");
    return;
  }

  try {
    // Lấy thông tin tài khoản
    const res = await getAccountById(userId);
    const user = res.data;

    // Kiểm tra sản phẩm đã được mua chưa
    const isPurchased = user.purchasedBooks?.includes(product.id);
    if (isPurchased) {
      alert(`Sản phẩm "${product.name}" đã được mua trước đó!`);
      return;
    }

    // Thêm sản phẩm vào purchasedBooks
    const updatedPurchasedBooks = [...(user.purchasedBooks || []), product.id];

    // Xóa sản phẩm khỏi cart nếu có
    const updatedCart = (user.cart || []).filter((id) => id !== product.id);

    // Cập nhật thông tin người dùng
    await putData1(`/Account/${userId}`, {
      ...user,
      purchasedBooks: updatedPurchasedBooks,
      cart: updatedCart,
    });

    // Đồng bộ purchasedBooks và cart vào localStorage
    localStorage.setItem("myBook", JSON.stringify(updatedPurchasedBooks));
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Phát sự kiện updateCounts để Header cập nhật myBookCount và cartCount
    window.dispatchEvent(new Event("updateCounts"));

    alert(`Đã mua "${product.name}" thành công!`);
  } catch (error) {
    console.error("Lỗi khi mua sản phẩm:", error);
    alert("Mua sản phẩm thất bại. Vui lòng thử lại.");
  }
};