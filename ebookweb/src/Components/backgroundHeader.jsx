export const BackgroundHeader = ({ label }) => {
  return (
    <section className="relative h-[300px] w-full flex items-center justify-center text-white text-center">
      <div
        className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-indigo-900/90 z-0"
      ></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-2 drop-shadow-md">{label}</h1>
      </div>
    </section>
  );
};