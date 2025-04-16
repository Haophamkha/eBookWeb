import NewsCard from "../Components/newsCard";

export default function News() {
  const newsList = [
    {
      title: "Benefits of reading: Smart, Diligent, Happy, Intelligent",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
      image: "https://images.unsplash.com/photo-1600488999649-e3c3d83ca6ef",
      date: "24 March, 2024",
    },
    {
      title: "10 Things you must know to improve your reading skills",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      date: "18 July, 2024",
    },
    {
      title: "Benefits of reading: Smart, Diligent, Happy, Intelligent",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
      image: "https://images.unsplash.com/photo-1588776814546-bb3a2a1c8b84",
      date: "7 June, 2024",
    },
    {
      title: "We Must know why reading is important for children?",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor",
      image: "https://images.unsplash.com/photo-1610173828049-6d82d879b9c4",
      date: "30 May, 2024",
    },
  ];

  return (
    <section className="py-10 px-4 md:px-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">Latest News</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua
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
