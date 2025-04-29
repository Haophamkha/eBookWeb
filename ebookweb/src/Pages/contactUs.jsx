import { CountFeatureList } from "../Components/CountFeatureList";
import { MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { CustomButton } from "../Components/UIElements";
import { BackgroundHeader } from "../Components/backgroundHeader";
import { useEffect, useRef } from "react";

const ContactUs = () => {
  const recaptchaRef = useRef(null);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (
        window.grecaptcha &&
        recaptchaRef.current &&
        !recaptchaRef.current.hasAttribute("data-rendered")
      ) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6LfLWCcrAAAAAO92Ys0Ei86oKsdZaD1VZsA_4edV",
          callback: (response) => console.log("reCAPTCHA verified:", response), 
        });
        recaptchaRef.current.setAttribute("data-rendered", "true");
      }
    };

    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      script.onload = loadRecaptcha;
      document.body.appendChild(script);
    } else {
      loadRecaptcha();
    }

    return () => {
      if (recaptchaRef.current && window.grecaptcha) {
        try {
          window.grecaptcha.reset(); 
        } catch (error) {
          console.warn("Error resetting reCAPTCHA:", error);
        }
      }
    };
  }, []);

  return (
    <>
      <BackgroundHeader label="Contact Us" />

      <div className="w-full">
        <img
          src="image.png"
          alt="Map Location"
          className="w-full h-80 object-cover"
        />
      </div>

      <div className="flex flex-col md:flex-row relative z-10">
        <div className="relative w-full md:w-1/2 h-[450px]">
          <img
            src="bg2.jpg"
            alt="Library Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(31,25,93,0.5)] to-[rgba(31,25,93,0.99)] p-8 flex justify-end text-white rounded-lg">
            <div className="max-w-[400px] pr-4">
              <h2 className="text-3xl font-bold mb-4 uppercase">
                Liên hệ
              </h2>
              <p className="text-base font-medium mb-8">
                Nếu bạn cảm thấy thú vị khi làm việc với chúng tôi, liên hệ ngay tại
              </p>

              <div className="flex items-start gap-4 mb-6">
                <MdLocationOn className="text-3xl text-yellow-400" />
                <div>
                  <h3 className="font-bold text-lg mb-1 uppercase">
                    Địa chỉ
                  </h3>
                  <p className="text-sm">
                    12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MdOutlineEmail className="text-3xl text-yellow-400" />
                <div>
                  <h3 className="font-bold text-lg mb-1 uppercase">
                    Địa chỉ email
                  </h3>
                  <p className="text-sm">haoEbook@gmail.com</p>
                  <p className="text-sm">uyenEbook@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 flex items-center bg-white border-0 relative">
          <div className="w-full max-w-[500px] p-8 border border-gray-300 rounded-lg shadow-lg bg-white -mt-30">
            <h3 className="text-orange-400 text-sm font-bold mb-2 uppercase">
              Contact Us
            </h3>
            <h2 className="text-3xl font-bold text-blue-900 mb-8 uppercase">
              Liên hệ với chúng tôi
            </h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="border border-gray-300 rounded-md px-4 py-3 placeholder:text-gray-500 placeholder:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <input
                type="email"
                placeholder="Địa chỉ email"
                className="border border-gray-300 rounded-md px-4 py-3 placeholder:text-gray-500 placeholder:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="border border-gray-300 rounded-md px-4 py-3 placeholder:text-gray-500 placeholder:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <textarea
                placeholder="Lời nhắn"
                rows="4"
                className="border border-gray-300 rounded-md px-4 py-3 resize-none placeholder:text-gray-500 placeholder:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-900"
              ></textarea>

              <div ref={recaptchaRef} id="recaptcha-container"></div>

              <div className="pt-2">
                <CustomButton
                  label="Gửi"
                  width="100%"
                  icon={null}
                  className="flex items-center justify-center text-lg font-bold tracking-wider bg-orange-400 text-white py-3 rounded-md hover:bg-orange-500 transition"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <CountFeatureList />
    </>
  );
};

export default ContactUs;