import React, { useState, useEffect } from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiShop, CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom"; 
import useUserStore from "../Components/useUserStore";
import { putData1, getAccountById } from "../Utils/api"; 
import { Country, State } from "country-state-city";
import { IoBookOutline } from "react-icons/io5";

const MyProfile = () => {
  const { userId, userName, gmail, img, isLoggedIn, clearUser } = useUserStore(); 
  const navigate = useNavigate(); 

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [formData, setFormData] = useState({
    userName: userName || "",
    gmail: gmail || "",
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
  });

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(c => c.name === formData.country);
      if (selectedCountry) {
        const statesList = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates(statesList);
      }
    } else {
      setStates([]); // Reset states if no country selected
    }
  }, [formData.country, countries]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await getAccountById(userId);
        const userData = response.data;

        setFormData(prev => ({
          ...prev,
          userName: userData.userName || "",
          gmail: userData.gmail || "",
          professionalTitle: userData.professionalTitle || "",
          languages: userData.languages || "",
          age: userData.age || "",
          description: userData.description || "",
          contactNumber: userData.contactNumber || "",
          country: userData.country || "",
          postcode: userData.postcode || "",
          city: userData.city || "",
          fullAddress: userData.fullAddress || "",
          cart: userData.cart || [],
          purchasedBooks: userData.purchasedBooks || []
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!userId) return alert("User ID not found.");

    try {
      await putData1(`/Account/${userId}`, formData);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      alert(`Save failed: ${error.response?.status || error.message}`);
    }
  };

  const handleLogout = () => {
    clearUser(); 
    navigate("/login"); 
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8 flex">
        <div className="w-80 bg-white p-6 flex flex-col items-center">
          <div className="w-full bg-[#FFF9E5] p-4 rounded-md mb-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f5a623] mb-3">
              <img
                src={img || "https://via.placeholder.com/64x64?text=Avatar"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base font-bold text-[#1a3c5e] uppercase">{userName || "User Name"}</h3>
            {formData.professionalTitle && (
              <p className="text-sm text-gray-600">{formData.professionalTitle}</p>
            )}
          </div>

          <ul className="space-y-2 w-full">
            <li className="flex items-center text-[#f5a623] font-medium text-sm bg-[#FFF9E5] px-3 py-4 rounded-sm min-h-[60px]">
              <CiShop className="w-5 h-5 mr-2" />
              Thông tin cá nhân
            </li>
            {[{ icon: <IoBookOutline className="w-5 h-5 mr-2" />, label: 'Sách đã mua', to: '/mybook' },
              { icon: <MdOutlineShoppingCart className="w-5 h-5 mr-2" />, label: 'Đặt trước', to: '/cart' },
              { icon: <CiShop className="w-5 h-5 mr-2" />, label: 'Shop', to: '/shop' },
              { icon: <CiLogin className="w-5 h-5 mr-2" />, label: 'Log Out', to: null, onClick: handleLogout }]
              .map((item, index) => (
              <li key={index} className="flex items-center text-gray-600 text-sm px-3 py-4 rounded-sm min-h-[60px] hover:bg-[#FFF9E5] hover:text-[#f5a623] cursor-pointer transition-colors">
                {item.to ? (
                  <Link to={item.to} className="flex items-center w-full">
                    {item.icon}
                    {item.label}
                  </Link>
                ) : (
                  <div onClick={item.onClick} className="flex items-center w-full">
                    {item.icon}
                    {item.label}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 pl-6">
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#1a3c5e] mb-4 border-b-2 border-[#f5a623] inline-block pb-1">
              Thông tin cơ bản
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {[{ label: 'Tên của bạn', name: 'userName', value: formData.userName },
                { label: 'Nghề nghiệp', name: 'professionalTitle', value: formData.professionalTitle },
                { label: 'Ngôn ngữ', name: 'languages', value: formData.languages },
                { label: 'Tuổi', name: 'age', value: formData.age }]
                .map((item, i) => (
                  <div key={i}>
                    <label className="block text-xs font-medium text-gray-600 uppercase">{item.label}:</label>
                    <input
                      type="text"
                      name={item.name}
                      value={item.value}
                      onChange={handleInputChange}
                      placeholder={item.label}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400"
                    />
                  </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-xs font-medium text-gray-600 uppercase">Mô tả:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Mô tả"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400 h-28"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1a3c5e] mb-4 border-b-2 border-[#f5a623] inline-block pb-1">
              Thông tin liên lạc
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase">Số điện thoại liên lạc:</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="SĐT"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase">Địa chỉ email:</label>
                <input
                  type="email"
                  name="gmail"
                  value={formData.gmail}
                  readOnly
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400 cursor-not-allowed opacity-75"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase">Quốc gia:</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value, city: "" }))} // Reset city when country changes
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm"
                >
                  <option value="">Chọn quốc gia</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase">Tỉnh/Thành phố:</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm"
                >
                  <option value="">Chọn tỉnh/tp</option>
                  {states && states.length > 0 ? (
                    states.map((state) => (
                      <option key={state.isoCode} value={state.name}>
                        {state.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Chọn quốc gia để xem các tỉnh/thành phố</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase">Mã bưu chính:</label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder="Mã bưu chính"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase">Địa chỉ đầy đủ:</label>
                <input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  placeholder="Địa chỉ đầy đủ"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSave}
              className="bg-[#f5a623] text-white px-6 py-4 rounded-sm hover:bg-[#e69520] text-sm font-medium"
            >
              Lưu thông tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
