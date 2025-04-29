import React, { useState } from "react";
import { BackgroundHeader } from "../Components/backgroundHeader";
import { useNavigate } from "react-router-dom";
import { getAccount, postData1 } from "../Utils/api";

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setSuccess("");

    let errors = [];

    if (!userName.trim()) {
      errors.push({ field: "username", message: "Tên người dùng không được để trống." });
    }
    if (!email.trim()) {
      errors.push({ field: "email", message: "Email không được để trống." });
    }
    if (!password.trim()) {
      errors.push({ field: "password", message: "Mật khẩu không được để trống." });
    }

    if (email && !email.endsWith("@gmail.com")) {
      errors.push({ field: "email", message: "Email phải có đuôi @gmail.com." });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    if (password && !passwordRegex.test(password)) {
      errors.push({
        field: "password",
        message: "Mật khẩu phải có ít nhất 10 ký tự, bao gồm 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (@$!%*?&).",
      });
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        if (error.field === "username") setUsernameError(error.message);
        if (error.field === "email") setEmailError(error.message);
        if (error.field === "password") setPasswordError(error.message);
      });
      return;
    }

    try {
      console.log("Bắt đầu đăng ký...");
      const response = await getAccount();
      const accounts = response.data;
      console.log("Danh sách tài khoản:", accounts);

      // Kiểm tra email trùng lặp
      if (accounts.some((account) => account.gmail === email)) {
        setEmailError("Email đã được sử dụng. Vui lòng chọn email khác.");
        return;
      }

      const newUser = {
        userName,
        gmail: email,
        password,
        img: "https://via.placeholder.com/150",
        id: String(accounts.length + 1),
        professionalTitle: "",
        languages: "",
        age: "",
        description: "",
        contactNumber: "",
        country: "",
        postcode: "",
        city: "",
        fullAddress: "",
        cart: [],
        purchasedBooks: []
      };

      console.log("Gửi tài khoản mới:", newUser);
      await postData1("/Account", newUser); 
      setSuccess("Đăng ký thành công!");
      setUserName("");
      setEmail("");
      setPassword("");

      console.log("Thực hiện chuyển hướng đến /login...");
      navigate("/login");
    } catch (err) {
      console.error("Lỗi chi tiết khi đăng ký:", err.message, err.response?.data);
      if (err.code === "ERR_NETWORK") {
        setEmailError("Không thể kết nối đến server. Vui lòng kiểm tra server.");
      } else if (err.response?.status === 404) {
        setEmailError("Không tìm thấy API. Vui lòng kiểm tra cấu hình server.");
      } else {
        setEmailError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-auto">
      <BackgroundHeader label={"Trang đăng ký"} />
      <div className="flex justify-center w-full px-4 py-12">
        <div className="w-full max-w-2xl border rounded-lg shadow-lg p-10 min-h-[700px] flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Đăng ký tài khoản
            </h2>
            <p className="text-gray-600 mb-10 text-lg">
              Nếu bạn chưa có tài khoản, vui lòng đăng ký bên dưới.
            </p>

            {success && (
              <div className="text-green-500 mb-4 text-base">{success}</div>
            )}

            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block font-semibold text-blue-900 mb-2 text-base">
                  Tên người dùng *
                </label>
                {usernameError && (
                  <div className="text-red-500 text-sm mb-2">{usernameError}</div>
                )}
                <input
                  type="text"
                  placeholder="Tên người dùng của bạn"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded bg-gray-100 text-base"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-blue-900 mb-2 text-base">
                  Địa chỉ email *
                </label>
                {emailError && (
                  <div className="text-red-500 text-sm mb-2">{emailError}</div>
                )}
                <input
                  type="email"
                  placeholder="Địa chỉ email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded bg-gray-100 text-base"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-blue-900 mb-2 text-base">
                  Mật khẩu *
                </label>
                {passwordError && (
                  <div className="text-red-500 text-sm mb-2">{passwordError}</div>
                )}
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded bg-gray-100 text-base"
                  required
                />
              </div>

              <p className="text-gray-600 text-sm">
                Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm trên
                website này, quản lý quyền truy cập tài khoản, và cho các mục đích
                khác được mô tả trong{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  chính sách bảo mật
                </a>.
              </p>

              <button
                type="submit"
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-7 rounded transition text-base"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;