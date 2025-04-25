import React, { useState, useEffect } from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom"; 
import useUserStore from "../Components/useUserStore";
import { patchData, getAccountById } from "../Utils/api"; 

const MyProfile = () => {
  const { userId, userName, gmail, img, isLoggedIn, clearUser } = useUserStore(); 
  const navigate = useNavigate(); 

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
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.log("User ID not found, skipping fetch");
        return;
      }

      try {
        const response = await getAccountById(userId); // Sử dụng getAccountById
        const userData = response.data;

        setFormData({
          userName: userData.userName || userName || "",
          gmail: userData.gmail || gmail || "",
          professionalTitle: userData.professionalTitle || "",
          languages: userData.languages || "",
          age: userData.age || "",
          description: userData.description || "",
          contactNumber: userData.contactNumber || "",
          country: userData.country || "",
          postcode: userData.postcode || "",
          city: userData.city || "",
          fullAddress: userData.fullAddress || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId, userName, gmail]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("User not logged in, redirecting to /login from MyProfile");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    const dataToSave = {
      userName: formData.userName,
      gmail: formData.gmail,
      professionalTitle: formData.professionalTitle,
      languages: formData.languages,
      age: formData.age,
      description: formData.description,
      contactNumber: formData.contactNumber,
      country: formData.country,
      postcode: formData.postcode,
      city: formData.city,
      fullAddress: formData.fullAddress,
    };

    try {
      await patchData(`/accounts/${userId}`, dataToSave);
      alert("Settings saved successfully!");

      setFormData({
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
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  };

  const handleLogout = () => {
    console.log("handleLogout called in MyProfile");
    clearUser(); 
    console.log("Navigating to /login from MyProfile"); 
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
              Profile
            </li>
            {[
              { icon: <MdOutlineShoppingCart className="w-5 h-5 mr-2" />, label: 'My Cart', to: '/cart' },
              { icon: <CiShop className="w-5 h-5 mr-2" />, label: 'Shop', to: '/shop' },
              { icon: <CiLogin className="w-5 h-5 mr-2" />, label: 'Log Out', to: null, onClick: handleLogout },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center text-gray-600 text-sm px-3 py-4 rounded-sm min-h-[60px] hover:bg-[#FFF9E5] hover:text-[#f5a623] cursor-pointer transition-colors"
              >
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
              BASIC INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {[
                { label: 'Your Name', name: 'userName', value: formData.userName },
                { label: 'Professional title', name: 'professionalTitle', value: formData.professionalTitle },
                { label: 'Languages', name: 'languages', value: formData.languages },
                { label: 'Age', name: 'age', value: formData.age },
              ].map((item, i) => (
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
              <label className="block text-xs font-medium text-gray-600 uppercase">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400 h-28"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1a3c5e] mb-4 border-b-2 border-[#f5a623] inline-block pb-1">
              CONTACT INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {[
                { label: 'Contact Number', name: 'contactNumber', value: formData.contactNumber },
                { label: 'Email Address', name: 'gmail', value: formData.gmail, readOnly: true },
                { label: 'Country', name: 'country', value: formData.country },
                { label: 'Postcode', name: 'postcode', value: formData.postcode },
                { label: 'City', name: 'city', value: formData.city },
                { label: 'Full Address', name: 'fullAddress', value: formData.fullAddress },
              ].map((item, i) => (
                <div key={i}>
                  <label className="block text-xs font-medium text-gray-600 uppercase">{item.label}:</label>
                  <input
                    type={item.label === 'Email Address' ? 'email' : 'text'}
                    name={item.name}
                    value={item.value}
                    onChange={item.readOnly ? undefined : handleInputChange}
                    readOnly={item.readOnly}
                    placeholder={item.label}
                    className={`mt-1 block w-full p-3 border border-gray-300 rounded-sm bg-gray-100 text-sm placeholder-gray-400 ${item.readOnly ? 'cursor-not-allowed opacity-75' : ''}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSave}
              className="bg-[#f5a623] text-white px-6 py-4 rounded-sm hover:bg-[#e69520] text-sm font-medium"
            >
              SAVE SETTING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
