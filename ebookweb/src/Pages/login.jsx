import React, { useState } from "react";
import { FaUnlockAlt } from "react-icons/fa";
import { BackgroundHeader } from "../Components/backgroundHeader";
import { getAccount } from "../Utils/api";
import useUserStore from "../Components/useUserStore";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../Components/UIElements";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await getAccount();
      const accounts = response.data;
      const user = accounts.find(
        (account) => account.gmail === email && account.password === password
      );

      if (user) {
        setUser({
          id: user.id, // Thêm userId
          userName: user.userName,
          gmail: user.gmail,
          img: user.img || "https://via.placeholder.com/64x64?text=Avatar", // Đảm bảo có giá trị mặc định
        });
        navigate("/");
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
      console.error("Lỗi đăng nhập:", err);
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-white overflow-auto">
      <BackgroundHeader label={"Trang đăng nhập"} />

      <div className="flex flex-col md:flex-row justify-center gap-10 max-w-[1300px] px-4 py-8 mx-auto">
        {/* NEW CUSTOMER */}
        <div className="w-full md:w-[600px] border rounded-lg shadow-lg p-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 uppercase">
            Khách hàng mới
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-xl">
            Khi tạo tài khoản tại cửa hàng, bạn sẽ dễ dàng thanh toán nhanh hơn,
            lưu nhiều địa chỉ giao hàng, theo dõi đơn hàng và sử dụng nhiều tiện
            ích khác
          </p>
          <CustomButton
            label="TẠO TÀI KHOẢN"
            width="40%"
            icon={null}
            onClick={handleNavigateToRegister}
            className="text-white font-semibold py-2 px-2 flex items-center justify-center h-12"
          />
        </div>

        {/* LOGIN */}
        <div className="w-full md:w-[600px] border rounded-lg shadow-lg p-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 uppercase">
            Khung đăng nhập
          </h2>
          <p className="text-gray-600 mb-6 text-xl">
            Nếu bạn có tài khoản trước, vui lòng đăng nhập
          </p>

          {error && <div className="text-red-500 mb-4 text-base">{error}</div>}

          <form onSubmit={handleLogin}>
            <label className="block font-semibold text-blue-900 mb-2 text-base">
              Email *
            </label>
            <input
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded bg-gray-100 mb-5 text-base"
              required
            />

            <label className="block font-semibold text-blue-900 mb-2 text-base">
              Mật khẩu *
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded bg-gray-100 mb-5 text-base"
              required
            />

            <div className="flex items-center gap-4 w-full">
              <CustomButton
                type="submit"
                label="Đăng nhập"
                width="25%"
                icon={null}
                className="text-white font-semibold flex items-center justify-center h-12"
              />
              <button
                onClick={() =>
                  console.error("Chức năng này chưa được triển khai")
                }
                className="flex items-center gap-2 text-orange-500 font-medium hover:no-underline cursor-pointer text-base h-12 pb-4"
              >
                <FaUnlockAlt />
                Quên mật khẩu?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
