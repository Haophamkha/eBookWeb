import React from "react";

const ErrorPage = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white text-center">
      <div
        className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-900 before:to-purple-900 before:opacity-90 z-0"
      ></div>
      <div className="relative z-10">
        <h1 className="text-8xl md:text-9xl font-bold">404</h1>
        <p className="text-4xl md:text-5xl mt-6 max-w-[600px] mx-auto leading-tight font-extrabold">
          We are sorry. But the page you are looking for cannot be found.
        </p>
        <a
          href="/"
          className="mt-8 inline-block bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold uppercase tracking-wider hover:bg-orange-600 transition-colors"
        >
          Back to Homepage
        </a>
      </div>
    </section>
  );
};

export default ErrorPage;