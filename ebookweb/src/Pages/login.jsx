import React from "react";
import { FaUnlockAlt } from "react-icons/fa";
import { BackgroundHeader } from "../Components/backgroundHeader";

const Login = () => {
  return (
    <div className="min-h-screen bg-white overflow-auto">
      {/* Header */}
      <BackgroundHeader label={"Trang đăng nhập"} />

      {/* Content */}
      <div className="flex flex-col md:flex-row justify-center gap-10 max-w-[1300px] px-4 py-8 mx-auto">
        {/* NEW CUSTOMER */}
        <div className="w-full md:w-[600px] border rounded-lg shadow-lg p-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 uppercase">
            Khách hàng mới
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-xl">
            Khi tạo tài khoản tại cửa hàng, bạn sẽ dễ dàng thanh toán nhanh hơn,
            lưu nhiều địa chỉ giao hàng, theo dõi đơn hàng và sử dụng nhiều tiện ích khác
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-7 rounded transition text-base">
            TẠO TÀI KHOẢN
          </button>
        </div>

        {/* LOGIN */}
        <div className="w-full md:w-[600px] border rounded-lg shadow-lg p-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 uppercase">
            Khung đăng nhập
          </h2>
          <p className="text-gray-600 mb-6 text-xl">
            Nếu bạn có tài khoản trước, vui lòng đăng nhập
          </p>

          <form>
            <label className="block font-semibold text-blue-900 mb-2 text-base">
              Email *
            </label>
            <input
              type="email"
              placeholder="Email của bạn"
              className="w-full border border-gray-300 p-3 rounded bg-gray-100 mb-5 text-base"
            />

            <label className="block font-semibold text-blue-900 mb-2 text-base">
              Mật khẩu *
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full border border-gray-300 p-3 rounded bg-gray-100 mb-5 text-base"
            />

            <div className="flex items-center gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-7 rounded transition text-base">
                Đăng nhập
              </button>

              <a
                href="#"
                className="flex items-center gap-2 text-orange-500 font-medium hover:underline text-base"
              >
                <FaUnlockAlt />
                Quên mật khẩu?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
