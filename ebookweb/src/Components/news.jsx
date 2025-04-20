import { useEffect, useState } from "react";
import NewsCard from "../Components/newsCard";
import { getNews } from "../Utils/api"; 
export default function News() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    getNews()
      .then((res) => {
        setNewsList(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API news:", err);
      });
  }, []);

  return (
    <section className="py-24 px-4 md:px-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">Thông tin mới nhất</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Những thông tin về sách sẽ được cập nhật thường xuyên tại đây. Hãy theo dõi để không bỏ lỡ những thông tin thú vị nhé!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {newsList.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            description={news.description}
            image={news.image}
            date={news.date}
          />
        ))}
      </div>
    </section>
  );
}
