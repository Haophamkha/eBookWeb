import React from "react";
export const LogoCard = () => {
  const logos = [
    {
      image: "https://res.cloudinary.com/dok0odn5l/image/upload/v1745050596/particularbooks_jb1due.avif",
      alt: "particular books",
    },
    {
      image: "https://res.cloudinary.com/dok0odn5l/image/upload/v1745050596/mercia_kctewi.avif",
      alt: "Mercia books",
    },
    {
      image: "https://res.cloudinary.com/dok0odn5l/image/upload/v1745050597/atlantic-books_e1zz7w.avif",
      alt: "Atlantic Books",
    },
    {
      image: "https://res.cloudinary.com/dok0odn5l/image/upload/v1745050596/oneworld_ippr2t.avif",
      alt: "Oneworld",
    },
    {
      image: "https://res.cloudinary.com/dok0odn5l/image/upload/v1745051651/mora_iftooh.avif",
      alt: "Mora",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-48 p-4">
      {logos.map((logo, index) => (
        <div key={index} className="flex items-center justify-center">
          <img
            src={logo.image}
            alt={logo.alt}
            className="w-32 h-22 filter grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      ))}
    </div>
  );
};


