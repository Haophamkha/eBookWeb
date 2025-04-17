import { CalendarDays } from "lucide-react";

export default function NewsCard({ title, description, image, date }) {
  return (
    <div className="max-w-xs h-full rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white flex flex-col">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-md font-bold text-indigo-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-3">{description}</p>
        </div>
        <div className="flex items-center text-sm text-gray-500 gap-2 border-t pt-2 mt-auto">
          <CalendarDays className="w-4 h-4 text-orange-500" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
