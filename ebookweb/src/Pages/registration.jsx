import React from "react";
import {BackgroundHeader} from "../Components/backgroundHeader";
const Registration = () => {
  return (
    <div className="min-h-screen bg-white overflow-auto">
      
        <BackgroundHeader label={"Trang đăng ký"}/>
      <div className="flex justify-center w-full px-4 py-12">
        <div className="w-full max-w-2xl border rounded-lg shadow-lg p-10 min-h-[700px] flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Registration</h2>
            <p className="text-gray-600 mb-10 text-lg">
              If you don't have an account with us, please register below.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block font-semibold text-blue-900 mb-2 text-base">Username *</label>
                <input
                  type="text"
                  placeholder="Your Username"
                  className="w-full border border-gray-300 p-3 rounded bg-gray-100 text-base"
                />
              </div>

              <div>
                <label className="block font-semibold text-blue-900 mb-2 text-base">Email address *</label>
                <input
                  type="email"
                  placeholder="Your Email address"
                  className="w-full border border-gray-300 p-3 rounded bg-gray-100 text-base"
                />
              </div>

              <div>
                <label className="block font-semibold text-blue-900 mb-2 text-base">Password *</label>
                <input
                  type="password"
                  placeholder="Type Password"
                  className="w-full border border-gray-300 p-3 rounded bg-gray-100 text-base"
                />
              </div>

              <p className="text-gray-600 text-sm">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  privacy policy
                </a>.
              </p>

              <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-7 rounded transition text-base">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
