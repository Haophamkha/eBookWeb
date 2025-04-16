import { CalendarDays } from "lucide-react";

export default function newsCard({ title, description, image, date }) {
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-md font-bold text-indigo-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-500 gap-2 border-t pt-2">
          <CalendarDays className="w-4 h-4 text-orange-500" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
