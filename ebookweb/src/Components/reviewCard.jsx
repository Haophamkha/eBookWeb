import { FaStar } from "react-icons/fa";

export default function ReviewCard({ name, avatar, comment, stars, isHighlighted }) {
  const maxStars = 5;
  const truncatedComment = comment.length > 150 ? comment.substring(0, 150) + "..." : comment;

  return (
    <div
      className={`
        group transition-all duration-300 rounded-xl p-6 max-w-sm mx-auto shadow-md 
        flex flex-col justify-between min-h-[250px]
        ${isHighlighted ? "bg-orange-300 text-white" : "bg-white text-gray-800"} 
        hover:bg-orange-300 hover:text-white hover:shadow-lg
      `}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4 text-xl">
        {Array.from({ length: maxStars }, (_, i) => (
          <FaStar
            key={i}
            className={`
              w-5 h-5 transition-colors
              ${i < stars
                ? isHighlighted
                  ? "text-white"
                  : "text-yellow-400 group-hover:text-white"
                : "text-gray-300 group-hover:text-white"}
            `}
          />
        ))}
      </div>

      {/* Review Text */}
      <div className="flex-grow mb-6">
        <p className={`text-sm break-words line-clamp-3 transition-colors
          ${isHighlighted ? "text-white" : "text-gray-700 group-hover:text-white"}
        `}>
          {truncatedComment}
        </p>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className={`
            w-12 h-12 rounded-full border-2 transition-colors
            ${isHighlighted ? "border-white" : "border-gray-300 group-hover:border-white"}
          `}
        />
        <div>
          <h4 className={`font-bold transition-colors 
            ${isHighlighted ? "text-white" : "text-indigo-800 group-hover:text-white"}
          `}>
            {name}
          </h4>
          <p className={`text-sm transition-colors
            ${isHighlighted ? "text-white/80" : "text-gray-500 group-hover:text-white"}
          `}>
            Book Lovers
          </p>
        </div>
      </div>
    </div>
  );
}
