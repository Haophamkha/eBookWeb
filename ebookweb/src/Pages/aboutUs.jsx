import React, { useEffect, useState } from 'react';
import FeatureCard from '../Components/FeatureCard';
import { FaBook, FaAward, FaStore, FaCheck } from 'react-icons/fa';
import { BackgroundHeader } from '../Components/backgroundHeader';
import {CustomButton} from "../Components/UIElements"
const AboutUs = () => {
  const [experience, setExperience] = useState(0);

  useEffect(() => {
    let current = 0;
    const target = 20;
    const interval = setInterval(() => {
      if (current < target) {
        current++;
        setExperience(current);
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <BackgroundHeader label="Giới Thiệu" />

      <div className="my-14 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
        <div className="flex-1 flex gap-6">
          <div className="w-[60%] h-[460px] rounded-xl overflow-hidden shadow-lg">
            <img
              src="abus1.jpg"
              alt="Sách với hoa"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-[40%] flex flex-col justify-between h-full">
            <div className="w-full h-[220px] rounded-xl overflow-hidden shadow-lg">
              <img
                src="abus2.jpg"
                alt="Giá sách"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="mt-6 space-y-2">
              {[
                'Truyện tranh và đồ họa',
                'Tiểu sử - Hồi ký',
                'Tuyển tập văn học',
                'Truyện thiếu nhi',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <FaCheck className="text-orange-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <h2 className="text-5xl font-bold text-blue-900">
            eBookWeb - Sự lựa chọn hàng đầu cho người yêu sách
          </h2>
          <p className="text-gray-600 text-lg">
            Trải qua nhiều năm phát triển, eBookWeb tự hào mang đến cho bạn hàng ngàn đầu sách chất lượng, đa dạng thể loại. Với phương châm "Sách hay - Tri thức vững", chúng tôi luôn nỗ lực phục vụ tốt nhất cho nhu cầu học tập và giải trí của bạn.
          </p>

          <CustomButton label='Contact Us' to="/contact" icon={null}  className="bg-orange-400 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-orange-500 transition" />

          <div className="ml-72 bg-orange-400 text-white px-6 py-4 rounded-xl shadow-xl z-20 w-52 text-left mt-10">
            <p className="text-[72px] font-extrabold leading-none">{experience}+</p>
            <p className="text-2xl font-semibold tracking-wide">Năm kinh nghiệm</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-14">
        <div className="px-4 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Sứ mệnh của Bookland là lan tỏa văn hóa đọc, truyền cảm hứng học tập và phát triển bản thân cho mọi thế hệ. Chúng tôi cam kết mang đến nguồn sách phong phú, chất lượng, giúp bạn mở rộng tri thức và chạm tới những chân trời mới.
          </p>
          <div className="flex flex-col md:flex-row gap-10 justify-center">
            <FeatureCard
              icon={<FaBook />}
              title="Hiệu sách hàng đầu"
              description="Cung cấp hàng ngàn đầu sách chất lượng, đa dạng lĩnh vực, đáp ứng nhu cầu học tập và giải trí."
            />
            <FeatureCard
              icon={<FaAward />}
              title="Nhà cung cấp uy tín"
              description="Được hàng triệu khách hàng tin tưởng lựa chọn, luôn cam kết sản phẩm chính hãng và dịch vụ tận tâm."
            />
            <FeatureCard
              icon={<FaStore />}
              title="Mở rộng hệ thống"
              description="Không ngừng mở rộng hệ thống phân phối và cửa hàng, đưa sách hay đến gần bạn hơn mỗi ngày."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
